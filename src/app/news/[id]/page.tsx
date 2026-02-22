import { client } from "../../../libs/microcms";
import Link from 'next/link';
import { ArrowLeft, Clock, FileText, Leaf } from 'lucide-react';
// Navbarコンポーネントの読み込み
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import RichTextRenderer from '../../../components/RichTextRenderer';

// --- Footer Component ---


// --- Main Page Component ---
export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let post = null;
  try {
    post = await client.get({
      endpoint: "news",
      contentId: id,
    });
  } catch (e) {
    // 記事が見つからなかった場合のエラー表示画面
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-500 mt-16">
          <div className="text-center bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
            <p className="mb-6 font-bold text-lg text-slate-700">記事が見つかりませんでした。</p>
            <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold bg-emerald-50 px-6 py-2.5 rounded-full border border-emerald-100 transition-colors group">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> トップへ戻る
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 記事が見つかった場合の通常表示画面
  return (
    // ここを bg-slate-50/50 (ほんのりとした、明るくクリーンなオフホワイト) に変更
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 selection:bg-emerald-200 flex flex-col relative overflow-hidden">
      
      {/* 背景の装飾：画面上部にうっすらとした緑のグラデーションを配置し、華やかさを足す */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-50/80 to-transparent -z-10" />

      <Navbar />
      
      <main className="flex-1 py-24 px-4 sm:px-6 mt-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* 戻るボタンも、より洗練されたスタイルに */}
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-emerald-600 font-bold mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> トップへ戻る
          </Link>
          
          <article className="bg-white rounded-[2rem] p-8 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/40 relative">
              <header className="mb-10 border-b border-slate-100 pb-8">
                  <div className="flex items-center text-emerald-700 text-sm font-bold mb-5 bg-emerald-50/80 w-fit px-4 py-1.5 rounded-full border border-emerald-100">
                      <Clock size={16} className="mr-2 text-emerald-500" />
                      <time>{new Date(post.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}</time>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight mb-8 tracking-tight">{post.title}</h1>
                  {post.eyecatch && (
                    <img 
                      src={post.eyecatch.url} 
                      alt={post.title}
                      className="w-full h-auto rounded-2xl border border-slate-100 shadow-sm object-cover max-h-[400px]"
                    />
                  )}
              </header>
              {/* 分離したクライアントコンポーネントをここで呼び出す */}
              <RichTextRenderer content={post.content} />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}