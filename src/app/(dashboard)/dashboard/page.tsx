import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Star,
  Plus,
  LogOut,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: clinics } = await supabase
    .from("clinics")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const clinicIds = clinics?.map((c) => c.id) ?? [];
  const hasClinics = clinicIds.length > 0;

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, clinics!inner(name)")
    .in("clinic_id", hasClinics ? clinicIds : ["00000000-0000-0000-0000-000000000000"])
    .order("published_at", { ascending: false })
    .limit(50);

  const allReviews = reviews ?? [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayReviews = allReviews.filter((r) => new Date(r.published_at) >= today);
  const negativeCount = allReviews.filter((r) => r.sentiment === "negative").length;
  const avgRating =
    allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-[15px] tracking-tight">
            <div className="w-6 h-6 rounded bg-sky-600 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            クチコミ番人
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <span className="text-gray-400">{user.email}</span>
            <form action="/api/auth/signout" method="POST">
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
                <LogOut className="w-3.5 h-3.5" />
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>

      {!hasClinics ? (
        <main className="max-w-lg mx-auto px-6 py-24 text-center">
          <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-7 h-7 text-sky-600" />
          </div>
          <h1 className="text-xl font-semibold mb-3">医院を登録しましょう</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            あなたの医院の Google 口コミを監視するには、
            <br />
            まず医院の情報を登録してください。
          </p>
          <Link
            href="/clinics/new"
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-7 py-3 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            医院を登録する
          </Link>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-semibold">ダッシュボード</h1>
              <p className="text-sm text-gray-400 mt-1">
                {clinics?.length ?? 0} 医院を監視中
              </p>
            </div>
            <Link
              href="/clinics/new"
              className="flex items-center gap-1.5 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              医院を追加
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: "今日の口コミ", value: `${todayReviews.length} 件`, icon: MessageSquare, color: "text-sky-600", bg: "bg-sky-50" },
              { label: "平均評価", value: avgRating ? `★ ${avgRating}` : "—", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "要注意", value: `${negativeCount} 件`, icon: AlertTriangle, color: negativeCount > 0 ? "text-red-600" : "text-gray-400", bg: negativeCount > 0 ? "bg-red-50" : "bg-gray-50" },
              { label: "総口コミ数", value: `${allReviews.length} 件`, icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
            ].map((stat) => (
              <div key={stat.label} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-md ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Clinics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {clinics?.map((clinic) => {
              const clinicReviews = allReviews.filter((r) => r.clinic_id === clinic.id);
              const neg = clinicReviews.filter((r) => r.sentiment === "negative");
              return (
                <div key={clinic.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-sky-50 flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5 text-sky-600" />
                    </div>
                    <h3 className="font-semibold text-sm">{clinic.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{clinicReviews.length} 件</span>
                    <span className={neg.length > 0 ? "text-red-600 font-medium" : ""}>
                      要注意 {neg.length}
                    </span>
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className={`w-1.5 h-1.5 rounded-full ${clinic.line_notify_enabled ? "bg-emerald-500" : "bg-gray-300"}`} />
                      <span className="text-gray-400">
                        {clinic.line_notify_enabled ? "通知中" : "未設定"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reviews */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                口コミ一覧
              </h2>
              <span className="text-xs text-gray-400">{allReviews.length} 件</span>
            </div>

            {allReviews.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">まだ口コミがありません</p>
                <p className="text-gray-400 text-xs mt-1">新しい口コミがつくとここに表示されます</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {allReviews.slice(0, 20).map((review) => {
                  const clinic = review.clinics as unknown as { name: string };
                  const isNegative = review.sentiment === "negative";
                  return (
                    <div key={review.id} className={`px-5 py-4 ${isNegative ? "bg-red-50/30 border-l-2 border-l-red-400" : ""}`}>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-medium">{clinic.name}</span>
                        <span className="text-amber-500 text-xs">
                          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </span>
                        {isNegative && (
                          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            要注意
                          </span>
                        )}
                        {review.notified && (
                          <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">
                            LINE 通知済
                          </span>
                        )}
                        <span className="text-xs text-gray-300 ml-auto">
                          {new Date(review.published_at).toLocaleDateString("ja-JP", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${isNegative ? "text-gray-700 font-medium" : "text-gray-500"}`}>
                        {review.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
