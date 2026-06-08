import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="text-xl font-semibold mb-8">プライバシーポリシー</h1>
        <p className="text-gray-500 mb-8">制定日: 2026年6月8日</p>

        <section className="space-y-6">
          <div>
            <h2 className="font-medium mb-2">1. 収集する情報</h2>
            <p className="text-gray-500">
              当サービスでは、アカウント作成時にメールアドレスを収集します。
              また、医院登録時に医院名、GoogleマップURL、LINEユーザーIDを収集します。
              Google口コミデータは、お客様に代わって当サービスがGoogle Places
              API経由で取得し、表示します。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">2. 情報の利用目的</h2>
            <ul className="text-gray-500 list-disc pl-4 space-y-1">
              <li>アカウントの認証および管理</li>
              <li>口コミ監視サービスの提供</li>
              <li>LINEを通じた口コミ通知の送信</li>
              <li>サービス改善のための分析</li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium mb-2">3. 第三者提供</h2>
            <p className="text-gray-500">
              当サービスは、サービス提供に必要な範囲で以下の第三者サービスを利用しています。
              <br />
              Supabase（データベース・認証）、LINE（通知送信）、Google Places
              API（口コミ取得）、Vercel（ホスティング）。
              法令に基づく場合を除き、お客様の同意なく情報を第三者に提供することはありません。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">4. データの保存期間</h2>
            <p className="text-gray-500">
              アカウントが有効である限り、情報を保持します。
              アカウント削除時には、法令に基づく保存義務があるものを除き、情報を削除します。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">5. お問い合わせ</h2>
            <p className="text-gray-500">
              本ポリシーに関するお問い合わせは、以下のメールアドレスまでお願いします。
              <br />
              support@kuchikomi-bannin.vercel.app
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
