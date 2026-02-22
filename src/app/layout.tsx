import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ① 検索結果の大きな青文字になるタイトル
  title: '桑都塾 | 八王子発・高専生と理系のための個別指導塾',
  
  // ② 検索結果のタイトルの下に表示される説明文（100〜120文字程度がおすすめ）
  description: '桑都塾は、八王子を拠点とする「すべての子どもに教育を」を掲げる新しい学習塾です。高専生の進級・大学編入支援から、小中高の受験対策まで、完全オーダーメイドの個別指導を低価格で提供します。',
  
  // ③ その他の基本設定（任意ですがSEOに有利です）
  keywords: ['桑都塾', '八王子', '高専', '編入', '個別指導', 'オンライン塾', 'オンライン指導', '中学受験', '東工大', '編入受験'],
  authors: [{ name: '河内 悠眞 / Yuma Kawachi' }],
  
  // ④ LINEやTwitterでURLを貼った時に表示されるカード（OGP）の設定
  openGraph: {
    title: '桑都塾 | 八王子発・高専生と理系のための個別指導塾',
    description: '完全オーダーメイドの個別指導を低価格で提供します。',
    url: 'https://soutojuku.com',
    siteName: '桑都塾',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
