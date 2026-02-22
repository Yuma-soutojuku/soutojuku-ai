import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/message', // 新しい「塾長の想い」ページへ転送
        permanent: true,         // 検索エンジンに「永続的なお引越し」だと伝えます(301)
      },
      {
        source: '/point',
        destination: '/#features', // トップページの特徴セクションなどへ（適宜変更）
        permanent: true,
      },
      {
        source: '/online',
        destination: '/#courses', // コース一覧へ
        permanent: true,
      },
      {
        source: '/recruitment',
        destination: '/', // 現在求人ページがなければ、一旦トップへ
        permanent: true,
      },
      {
        source: '/20250707',
        destination: '/news/2-__xvfkz', // MicroCMSで作った「約款改定」の記事のIDを指定
        permanent: true,
      },
    ]
  },
};

export default nextConfig;