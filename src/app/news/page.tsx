// src/app/news/page.tsx
import { client } from "../../libs/microcms";

export default async function NewsPage() {
  // MicroCMSからお知らせを取得
  const { contents } = await client.get({ endpoint: "news" });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">お知らせ一覧</h1>
      <ul>
        {contents.map((post: any) => (
          <li key={post.id} className="mb-4 border-b pb-4">
            <p className="text-gray-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
            <h2 className="text-xl font-bold">{post.title}</h2>
            {/* リッチエディタの内容を表示 */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

