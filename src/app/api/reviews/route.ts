import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const querySecret = searchParams.get("secret");
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (querySecret !== process.env.CRON_SECRET && authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: clinics, error: clinicError } = await supabase
    .from("clinics")
    .select("*");

  if (clinicError || !clinics) {
    return NextResponse.json({ error: "No clinics found" }, { status: 500 });
  }

  const results: { name: string; newCount: number; error?: string }[] = [];

  for (const clinic of clinics) {
    try {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      if (!apiKey) break;

      const placeId = resolvePlaceId(clinic.google_place_id);

      let finalPlaceId = placeId;

      if (!finalPlaceId.startsWith("ChIJ") && !finalPlaceId.startsWith("cid:")) {
        const searchResp = await fetch(
          "https://places.googleapis.com/v1/places:searchText",
          {
            method: "POST",
            headers: {
              "X-Goog-Api-Key": apiKey,
              "Content-Type": "application/json",
              "X-Goog-FieldMask": "places.id",
            },
            body: JSON.stringify({
              textQuery: clinic.name,
              languageCode: "ja",
            }),
          },
        );

        if (searchResp.ok) {
          const searchData = await searchResp.json();
          if (searchData.places?.length > 0) {
            finalPlaceId = searchData.places[0].id;
          }
        }
      }

      if (!finalPlaceId || finalPlaceId === placeId) {
        results.push({ name: clinic.name, newCount: 0, error: "place_not_found" });
        continue;
      }

      const resp = await fetch(
        `https://places.googleapis.com/v1/places/${finalPlaceId}?fields=reviews&languageCode=ja`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "reviews",
          },
        },
      );

      if (!resp.ok) continue;

      const data = await resp.json();
      const googleReviews = data.reviews ?? [];

      let newCount = 0;

      for (const review of googleReviews) {
        const exists = await supabase
          .from("reviews")
          .select("id")
          .eq("clinic_id", clinic.id)
          .eq("review_id", review.name ?? "")
          .maybeSingle();

        if (exists.data) continue;

        const sentiment = guessSentiment(review.rating);

        await supabase.from("reviews").insert({
          clinic_id: clinic.id,
          review_id: review.name ?? "",
          author_name: review.relativePublishTimeDescription ?? "不明",
          rating: review.rating ?? 3,
          text:
            review.originalText?.text ??
            review.text ??
            "",
          published_at: review.publishTime ?? new Date().toISOString(),
          sentiment,
          notified: false,
        });

        newCount++;

        if (clinic.line_notify_enabled && clinic.line_user_id) {
          await sendLineNotification(clinic.line_user_id, clinic.name, review);
          await supabase
            .from("reviews")
            .update({ notified: true })
            .eq("review_id", review.name ?? "");
        }
      }

      results.push({ name: clinic.name, newCount });
    } catch {
      // skip failed clinics
    }
  }

  return NextResponse.json({ checked: clinics.length, results });
}

function guessSentiment(rating: number): string {
  if (rating >= 4) return "positive";
  if (rating <= 2) return "negative";
  return "neutral";
}

function resolvePlaceId(input: string): string {
  if (input.startsWith("ChIJ")) return input;

  const cidMatch = input.match(/[?&]cid=(\d+)/);
  if (cidMatch) {
    return `cid:${cidMatch[1]}`;
  }

  const altMatch = input.match(/\/place\/([^/@]+)/);
  if (altMatch) {
    return decodeURIComponent(altMatch[1]);
  }

  return input;
}

async function sendLineNotification(
  userId: string,
  clinicName: string,
  review: any,
) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return;

  const stars = "★".repeat(review.rating ?? 3) + "☆".repeat(5 - (review.rating ?? 3));
  const text =
    review.originalText?.text ?? review.text ?? "";
  const emoji =
    (review.rating ?? 3) >= 4
      ? "😊"
      : (review.rating ?? 3) <= 2
        ? "😟"
        : "😐";

  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: userId,
      messages: [
        {
          type: "text",
          text: `${emoji} 【${clinicName}】新しい口コミ\n${stars}\n\n${text.slice(0, 500)}`,
        },
      ],
    }),
  });
}
