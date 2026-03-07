import { client } from "../../../libs/microcms";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";

import { 
  ArrowLeft, Mail, Phone, GraduationCap, ChevronLeft, 
  MapPin, Briefcase, Zap, MessageSquare, BookOpen, Share2, UserPlus
} from 'lucide-react';

// --- Metadata Generation (SEO) ---
export async function generateMetadata({ params }: { params: Promise<{ instructorId: string }> }) {
  const { instructorId } = await params;
  
  try {
    const data = await client.getList({
      endpoint: "instructors",
      queries: { filters: `id[equals]${instructorId}` }
    });

    if (data.contents.length === 0) {
      return { title: '見つかりません | 桑都塾' };
    }

    const instructor = data.contents[0];
    return {
      title: `${instructor.name} | 桑都塾 講師プロフィール`,
      description: instructor.msg?.substring(0, 120) || '桑都塾の講師プロフィールです。',
      robots: { index: false, follow: false } // 検索避けをする場合はコメントアウトを解除
    };
  } catch (error) {
    return { title: 'エラー | 桑都塾' };
  }
}

// --- Main Page Component ---
export default async function InstructorProfilePage({ params }: { params: Promise<{ instructorId: string }> }) {
  const { instructorId } = await params;

  let instructor = null;
  try {
    // instructorIdに一致する講師データを取得
    const data = await client.getList({
      endpoint: "instructors",
      queries: { filters: `id[equals]${instructorId}` }
    });

    if (data.contents.length === 0) {
      notFound(); // 該当するデータがない場合は404ページへ
    }
    instructor = data.contents[0];

  } catch (e) {
    // 取得エラー時の表示
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-slate-500 mt-16">
          <div className="text-center bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
            <p className="mb-6 font-bold text-lg text-slate-700">講師情報が見つかりませんでした。</p>
            <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold bg-emerald-50 px-6 py-2.5 rounded-full border border-emerald-100 transition-colors group">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> トップへ戻る
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // データの整形 (タグや担当授業がカンマ区切りで入ってくることを想定)
  const tagsArray = instructor.tags ? (Array.isArray(instructor.tags) ? instructor.tags : instructor.tags.split(',')) : [];
  const classesArray = instructor.classes ? (Array.isArray(instructor.classes) ? instructor.classes : instructor.classes.split(',')) : [];
  const profileImage = instructor.image?.url || instructor.imageUrl?.url || instructor.imageUrl || instructor.image;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 selection:bg-emerald-200 flex flex-col relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-50/80 to-transparent -z-10" />

      <Navbar />

      <main className="flex-1 py-24 px-4 sm:px-6 mt-8 relative z-10">
        <div className="max-w-lg mx-auto">
          
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-emerald-600 font-bold mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all group">
            <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> トップページへ戻る
          </Link>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transform transition-all relative">
            
            <div className="h-32 bg-gradient-to-r from-emerald-400 to-teal-500 relative">
            </div>

            <div className="px-6 sm:px-8 relative -mt-16 mb-4 flex justify-between items-end">
              <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-lg relative">
                <div className="w-full h-full rounded-full bg-emerald-50 border border-emerald-100 overflow-hidden flex items-center justify-center">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-extrabold text-emerald-200">
                      {instructor.name ? instructor.name.charAt(0) : '?'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold shadow-sm">
                  <Briefcase size={14} className="mr-1.5 text-emerald-500" />
                  {instructor.role || '講師'}
                </span>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8">
              <h1 className="text-3xl font-extrabold text-slate-800 mb-1">{instructor.name}</h1>
              {instructor.kana && (
                <p className="text-emerald-600 font-bold text-sm mb-8 font-mono tracking-wide">{instructor.kana}</p>
              )}

              <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center text-sm font-bold text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shrink-0 shadow-sm text-slate-400">
                    <GraduationCap size={16} />
                  </div>
                  {instructor.univ || '経歴未登録'}
                </div>
                
                {instructor.email && (
                  <div className="flex items-center text-sm font-bold text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shrink-0 shadow-sm text-emerald-500">
                      <Mail size={16} />
                    </div>
                    <a href={`mailto:${instructor.email}`} className="hover:text-emerald-600 transition-colors underline underline-offset-2 decoration-slate-300">
                      {instructor.email}
                    </a>
                  </div>
                )}
                
                {instructor.phone && (
                  <div className="flex items-center text-sm font-bold text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shrink-0 shadow-sm text-emerald-500">
                      <Phone size={16} />
                    </div>
                    <a href={`tel:${instructor.phone.replace(/-/g, '')}`} className="hover:text-emerald-600 transition-colors font-mono">
                      {instructor.phone}
                    </a>
                  </div>
                )}

                {instructor.location && (
                  <div className="flex items-center text-sm font-bold text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shrink-0 shadow-sm text-slate-400">
                      <MapPin size={16} />
                    </div>
                    {instructor.location}
                  </div>
                )}
              </div>

              {instructor.msg && (
                <div className="mb-8">
                  <h3 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center border-b border-slate-100 pb-2">
                    <span className="w-1.5 h-4 bg-emerald-400 rounded-full mr-2"></span>
                    メッセージ・経歴
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed p-2 whitespace-pre-wrap">
                    {instructor.msg}
                  </p>
                </div>
              )}

              {classesArray.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center border-b border-slate-100 pb-2">
                    <span className="w-1.5 h-4 bg-teal-400 rounded-full mr-2"></span>
                    担当授業・コース
                  </h3>
                  <ul className="space-y-3 p-2">
                    {classesArray.map((cls: string, i: number) => (
                      <li key={i} className="flex items-center text-sm font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <BookOpen size={16} className="mr-3 text-teal-500 shrink-0" />
                        {cls.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tagsArray.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                  {tagsArray.map((tag: string, i: number) => (
                    <span key={i} className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 shadow-sm">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>

          <div className="mt-8 space-y-4">
             <button className="w-full flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors shadow-lg cursor-not-allowed opacity-80">
              <UserPlus className="mr-2" size={18} />
              スマートフォンに連絡先を登録 (準備中)
            </button>
            <a 
              href="https://forms.gle/89xACDb9c1EADi2G9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 transform hover:-translate-y-1"
            >
              <Zap className="mr-2" size={20} />
              この講師の体験授業を予約する
            </a>
            
            <a 
              href="https://lin.ee/tMbkYoY" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 transition-colors shadow-sm"
            >
              <MessageSquare className="mr-2 text-[#06C755]" size={20} />
              公式LINEで質問してみる
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
