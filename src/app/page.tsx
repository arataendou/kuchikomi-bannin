"use client";

import Link from "next/link";
import {
  MessageSquare,
  Bell,
  AlertTriangle,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-[15px] tracking-tight">
            <div className="w-6 h-6 rounded bg-sky-600 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            クチコミ番人
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/login" className="text-gray-500 hover:text-gray-900">
              ログイン
            </Link>
            <Link
              href="/signup"
              className="bg-sky-600 text-white px-5 py-2 rounded-md text-[13px] font-medium hover:bg-sky-700 transition-colors"
            >
              無料登録
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <span className="text-xs font-medium text-sky-600 tracking-widest uppercase">
          歯科医院の Google 口コミ監視
        </span>
        <h1 className="mt-5 text-[32px] font-semibold leading-tight tracking-tight">
          口コミを見逃さない。
          <br />
          LINE ですぐに気づく。
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed max-w-lg">
          あなたが診察しているあいだに、口コミは増えています。
          クチコミ番人なら、新しい口コミがついたら LINE でお知らせ。寝る前の 1 分で確認できます。
        </p>
        <div className="mt-8 flex items-center gap-5">
          <Link
            href="/signup"
            className="flex items-center gap-2 bg-sky-600 text-white px-7 py-3 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            無料ではじめる
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-sm text-gray-400">クレカ不要 · 1分で設定</span>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-sky-50/30">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-xs font-medium text-sky-600 tracking-widest uppercase mb-8">
            つかいかた
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "医院を登録", body: "Google マップの URL を入力するだけ。医院名と場所が自動で認識されます。" },
              { step: "2", title: "LINE と連携", body: "公式 LINE を友だち追加して「登録」と送ってください。これで通知の準備完了です。" },
              { step: "3", title: "放置で OK", body: "あとは口コミを待つだけ。新しい口コミがついたら LINE にお知らせが届きます。" },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-xs font-medium text-sky-700 shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-medium text-[15px]">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xs font-medium text-sky-600 tracking-widest uppercase mb-8">
          できること
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
              <Bell className="w-4.5 h-4.5 text-sky-600" />
            </div>
            <div>
              <h3 className="font-medium text-[15px]">LINE で即時通知</h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                口コミが投稿されたらすぐに LINE でお知らせ。診察中でも見逃しません。
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-[15px]">要注意をハイライト</h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                星 2 以下の口コミは「要注意」マーク付き。すぐに対応すべき口コミがわかります。
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4.5 h-4.5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-[15px]">ダッシュボードで管理</h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                これまでの口コミを一覧表示。平均評価や月ごとの件数も確認できます。
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-4.5 h-4.5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-[15px]">CSV エクスポート</h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                口コミデータを CSV で書き出せます。スタッフとの共有や分析にどうぞ。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-gray-100 bg-sky-50/30">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold">83%</p>
              <p className="text-xs text-gray-500 mt-1">
                口コミを見て<br />医院を選ぶ患者
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">3 日</p>
              <p className="text-xs text-gray-500 mt-1">
                悪い口コミが<br />放置される平均
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">1 分</p>
              <p className="text-xs text-gray-500 mt-1">
                クチコミ番人の<br />通知スピード
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xs font-medium text-sky-600 tracking-widest uppercase mb-8">
          料金
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
            <div>
              <h3 className="font-semibold text-[15px]">Free</h3>
              <p className="text-sm text-gray-500 mt-1">おためし</p>
              <p className="mt-4">
                <span className="text-2xl font-bold">¥0</span>
                <span className="text-sm text-gray-400"> / 月</span>
              </p>
            </div>
            <ul className="text-sm text-gray-500 space-y-2 mt-6 flex-1">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                1 医院まで
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                14 日分の口コミ履歴
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                LINE 通知
              </li>
            </ul>
            <Link
              href="/signup"
              className="block text-center py-2.5 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors mt-6"
            >
              無料ではじめる
            </Link>
          </div>

          <div className="border-2 border-sky-200 rounded-lg p-6 relative bg-sky-50/20 flex flex-col">
            <div>
              <span className="absolute -top-3 left-4 bg-sky-600 text-white text-[11px] font-medium px-3 py-0.5 rounded-full">
                おすすめ
              </span>
              <h3 className="font-semibold text-[15px]">Pro</h3>
              <p className="text-sm text-gray-500 mt-1">ほとんどの医院に</p>
              <p className="mt-4">
                <span className="text-2xl font-bold">¥1,480</span>
                <span className="text-sm text-gray-400"> / 月</span>
              </p>
            </div>
            <ul className="text-sm text-gray-500 space-y-2 mt-6 flex-1">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-400" />
                3 医院まで
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-400" />
                口コミ履歴む制限
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-400" />
                LINE 即時通知 + 要注意優先表示
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-400" />
                CSV エクスポート
              </li>
            </ul>
            <Link
              href="/signup"
              className="block text-center py-2.5 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700 transition-colors mt-6"
            >
              Pro ではじめる
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-gray-600">
            口コミ対応のむだなストレスを、今日で終わりにしませんか。
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 mt-6 bg-sky-600 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            無料ではじめる
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-400 mt-4">いつでも解約できます</p>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-xs text-gray-400">クチコミ番人</p>
      </footer>
    </div>
  );
}
