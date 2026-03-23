import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/#instructors', // 新しい「塾長の想い」ページへ転送
        permanent: true,         // 検索エンジンに「永続的なお引越し」だと伝えます(301)
      },
      {
        source: '/point',
        destination: '/message', // トップページの特徴セクションなどへ（適宜変更）
        permanent: true,
      },
      {
        source: '/online',
        destination: '/#courses', // コース一覧へ
        permanent: true,
      },
      {
        source: '/20250707',
        destination: '/news/2-__xvfkz', // MicroCMSで作った「約款改定」の記事のIDを指定
        permanent: true,
      },
      // 1. /?p=1 を / へ飛ばす
      {
        source: '/',
        has: [{ type: 'query', key: 'p', value: '1' }],
        permanent: true,
        destination: '/',
      },
      // 2. /index?p=1 を / へ飛ばす
      {
        source: '/index',
        has: [{ type: 'query', key: 'p', value: '1' }],
        permanent: true,
        destination: '/',
      },
      // 3. もし /index 自体も不要なら、それもリダイレクト
      {
        source: '/index',
        permanent: true,
        destination: '/',
      },
    ]
  },
};

export default nextConfig;