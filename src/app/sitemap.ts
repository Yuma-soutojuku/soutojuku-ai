import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://soutojuku.com', // あなたのドメイン
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://soutojuku.com/message', // 塾長の想いページ
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 将来的には、MicroCMSから記事一覧を取得してここに動的に追加することも可能です！
  ]
}