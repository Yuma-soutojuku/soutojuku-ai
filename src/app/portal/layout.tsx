import type { Metadata } from 'next';

// ここでタブのタイトルと概要を設定します
export const metadata: Metadata = {
  title: 'STAFF PORTAL | 桑都塾',
  description: '桑都塾のスタッフ専用ポータルサイト',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // page.tsx の内容をそのまま表示します
  return <>{children}</>;
}