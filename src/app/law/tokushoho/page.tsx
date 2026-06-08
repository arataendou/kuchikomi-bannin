import Link from "next/link";

export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
            ← トップにもどる
          </Link>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-12 text-sm leading-relaxed">
        <h1 className="text-xl font-semibold mb-8">特定商取引法に基づく表記</h1>

        <div className="divide-y divide-gray-100">
          {[
            { label: "事業者名", value: "V-Corp" },
            { label: "代表者", value: "遠藤 新大" },
            { label: "所在地", value: "東京都江戸川区西葛西3丁目16番20号 ペルシェール西葛西309号室" },
            { label: "連絡先", value: "support@kuchikomi-bannin.vercel.app" },
            { label: "販売価格", value: "Proプラン 月額1,480円（税込）" },
            { label: "支払方法", value: "クレジットカード決済（Stripe）" },
            { label: "支払時期", value: "ご登録時。以降は毎月同日に自動更新" },
            { label: "サービス提供時期", value: "ご登録後すぐに利用開始可能" },
            { label: "解約方法", value: "ダッシュボードよりいつでも解約可能" },
            { label: "返金について", value: "日割り返金は行っておりません" },
          ].map((row) => (
            <div key={row.label} className="flex py-3 gap-4">
              <span className="text-gray-400 w-32 shrink-0">{row.label}</span>
              <span className="text-gray-700">{row.value}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
