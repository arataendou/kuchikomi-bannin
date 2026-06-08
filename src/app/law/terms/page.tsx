import Link from "next/link";

export default function TermsPage() {
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
        <h1 className="text-xl font-semibold mb-8">利用規約</h1>
        <p className="text-gray-500 mb-8">制定日: 2026年6月8日</p>

        <section className="space-y-6">
          <div>
            <h2 className="font-medium mb-2">1. はじめに</h2>
            <p className="text-gray-500">
              本規約は、クチコミ番人（以下「当サービス」）の利用条件を定めるものです。
              お客様は本規約に同意の上、当サービスをご利用ください。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">2. アカウント</h2>
            <p className="text-gray-500">
              お客様は正確な情報を提供し、アカウントの管理責任を負います。
              不正利用が疑われる場合、当サービスはアカウントを停止することがあります。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">3. サービス内容</h2>
            <p className="text-gray-500">
              当サービスは、お客様が登録した医院のGoogle口コミを監視し、
              LINEを通じて通知するサービスです。
              口コミの取得頻度や精度は、Google
              Places APIの仕様に依存します。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">4. 料金と支払い</h2>
            <p className="text-gray-500">
              無料プランおよび有料プラン（Pro）があります。
              有料プランの料金は月額1,480円（税込）です。
              支払いは前払い制で、解約はいつでも可能です。
              日割り返金は行いません。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">5. 禁止事項</h2>
            <ul className="text-gray-500 list-disc pl-4 space-y-1">
              <li>法令違反行為</li>
              <li>他のお客様または第三者の権利侵害</li>
              <li>サービスの不正利用（過剰なリクエスト等）</li>
              <li>虚偽の医院情報の登録</li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium mb-2">6. 免責事項</h2>
            <p className="text-gray-500">
              当サービスは、Google
              Places APIの変更や停止により、口コミの取得が遅延または不能となる場合があります。
              これにより生じた損害について、当サービスは責任を負いません。
            </p>
          </div>

          <div>
            <h2 className="font-medium mb-2">7. 規約の変更</h2>
            <p className="text-gray-500">
              当サービスは必要に応じて本規約を変更できるものとします。
              変更後は本ページに掲載し、掲載をもって効力が生じます。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
