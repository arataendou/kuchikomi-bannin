import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "クチコミ番人 - 歯科医院のGoogle口コミ監視",
  description:
    "歯科医院のGoogle口コミを24時間監視し、新しい口コミをLINEで即時通知。悪い口コミに即対応できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
