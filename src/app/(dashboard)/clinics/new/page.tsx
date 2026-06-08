"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Bell,
  Info,
  ExternalLink,
  Check,
} from "lucide-react";

export default function NewClinicPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [lineUser, setLineUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase.from("clinics").insert({
      user_id: user.id,
      name,
      google_place_id: placeId,
      line_user_id: lineUser || null,
      line_notify_enabled: !!lineUser,
    });

    if (insertError) {
      setError("登録にしっぱいしました");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            ダッシュボードにもどる
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-12">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-12">
          {[
            { num: 1, label: "医院情報" },
            { num: 2, label: "LINE連携" },
            { num: 3, label: "確認" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step >= s.num
                    ? "bg-sky-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`text-xs ${step >= s.num ? "text-gray-700" : "text-gray-400"} hidden sm:inline`}>
                {s.label}
              </span>
              {s.num < 3 && <div className={`flex-1 h-px ${step > s.num ? "bg-sky-200" : "bg-gray-100"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5 text-sky-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">医院を登録</h1>
                <p className="text-xs text-gray-400">Google マップの情報を入力します</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  医院名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：○○歯科クリニック"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-100 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  Google マップの URL
                </label>
                <input
                  type="url"
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  placeholder="https://maps.google.com/maps?cid=..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-100 placeholder:text-gray-400"
                />
                <div className="flex items-start gap-2 mt-2 p-3 bg-gray-50 border border-gray-100 rounded-md">
                  <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Google マップで医院のページを開き、URL をそのまま貼り付けてください。
                    こちらで自動的に識別します。
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!name || !placeId}
                className="w-full py-2.5 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                つぎへ
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Bell className="w-4.5 h-4.5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">LINE と連携</h1>
                <p className="text-xs text-gray-400">口コミ通知を LINE で受け取ります</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50/50">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                  てじゅん
                </h3>
                <ol className="text-sm text-gray-500 space-y-3">
                  <li className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[11px] flex items-center justify-center shrink-0 font-medium">1</span>
                    <span>公式 LINE「クチコミ番人」を友だち追加</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[11px] flex items-center justify-center shrink-0 font-medium">2</span>
                    <span>LINE で「登録」と送信</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[11px] flex items-center justify-center shrink-0 font-medium">3</span>
                    <span>返信されたユーザー ID を下に入力</span>
                  </li>
                </ol>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  LINE ユーザー ID
                </label>
                <input
                  type="text"
                  value={lineUser}
                  onChange={(e) => setLineUser(e.target.value)}
                  placeholder="U..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-400 mt-2">
                  いまは入力しなくても、あとから設定できます
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  もどる
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
                >
                  つぎへ
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center">
                <Check className="w-4.5 h-4.5 text-sky-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">確認</h1>
                <p className="text-xs text-gray-400">内容を確認して監視を開始します</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <div className="border border-gray-100 rounded-md p-4 bg-gray-50/50">
                  <p className="text-xs text-gray-400 mb-0.5">医院名</p>
                  <p className="font-medium text-sm">{name}</p>
                </div>
                <div className="border border-gray-100 rounded-md p-4 bg-gray-50/50">
                  <p className="text-xs text-gray-400 mb-0.5">Google マップ URL</p>
                  <p className="text-xs text-gray-600 truncate">{placeId}</p>
                </div>
                <div className="border border-gray-100 rounded-md p-4 bg-gray-50/50">
                  <p className="text-xs text-gray-400 mb-0.5">LINE 通知</p>
                  <p className="text-sm">
                    {lineUser ? (
                      <span className="text-emerald-600 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        設定ずみ
                      </span>
                    ) : (
                      <span className="text-gray-400">未設定</span>
                    )}
                  </p>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="px-5 py-2.5 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  もどる
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-2.5 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "登録中..." : "監視を開始する"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
