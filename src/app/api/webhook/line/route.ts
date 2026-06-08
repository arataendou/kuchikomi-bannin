import { NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-line-signature");

  const secret = process.env.LINE_CHANNEL_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing config" }, { status: 500 });
  }

  if (signature) {
    const hash = createHmac("sha256", secret).update(body).digest("base64");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  if (!body) {
    return NextResponse.json({ ok: true });
  }

  let events;
  try {
    events = JSON.parse(body).events ?? [];
  } catch {
    return NextResponse.json({ ok: true });
  }

  for (const event of events) {
    if (event.type === "message" && event.message?.type === "text") {
      const replyToken = event.replyToken;
      const text = event.message.text;
      const userId = event.source.userId;

      if (text === "登録") {
        await replyToUser(replyToken, `LINE連携が完了しました。\nあなたのLINEユーザーID: ${userId}\n\nこのIDをクチコミ番人の設定画面で登録してください。`);
      } else {
        await replyToUser(replyToken, "「登録」と送信するとLINE通知を設定できます。");
      }
    }
  }

  return NextResponse.json({ ok: true });
}

async function replyToUser(replyToken: string, text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return;

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  });
}
