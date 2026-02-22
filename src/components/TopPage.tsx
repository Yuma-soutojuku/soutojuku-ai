'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Calendar, CheckCircle, Cpu, 
  Users, Menu, ChevronRight, TrendingUp, Clock, BookOpen,
  Award, Sparkles, GraduationCap, ArrowRight, Zap, MapPin,
  Heart, FileText, ExternalLink, ZoomIn, Car, PlayCircle, History, Leaf
} from 'lucide-react';

import Link from 'next/link';

// --- Data Definitions ---
import {
    NEWS,
    COURSES,
    PAST_EXAM_COURSE,
    FACE_TO_FACE_COURSE,
    INSTRUCTORS,
    ACTIVE_CLASSES,
    PAST_CLASSES
} from "../constants/constants";

import { NAV_ITEMS, RESERVATION_URL } from "../constants/components";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// --- Components ---
import { HERO_CONTENT } from "../constants/components";

const Hero = () => {
  return (
    <div className="relative bg-emerald-50 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* 背景の装飾は構造（デザイン）なのでそのまま */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-200 bg-white/60 text-emerald-700 text-sm font-bold mb-8 backdrop-blur-sm shadow-sm">
          <MapPin size={16} className="mr-2 text-emerald-500" />
          {HERO_CONTENT.locationTag}
        </div>

        <h1 className="text-4xl tracking-tight font-extrabold text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl mb-10 leading-snug">
          <span className="block mb-2">{HERO_CONTENT.titleMain}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500">
            {HERO_CONTENT.titleSub}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 mb-12 font-medium leading-relaxed">
          {HERO_CONTENT.description.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={HERO_CONTENT.ctaPrimary.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-full shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1 flex items-center justify-center"
          >
            <Zap className="mr-2" size={20} />
            {HERO_CONTENT.ctaPrimary.label}
          </a>
          <a 
            href={HERO_CONTENT.ctaSecondary.url} 
            className="px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-lg font-bold rounded-full transition-all flex items-center justify-center shadow-sm"
          >
            <BookOpen className="mr-2" size={20} />
            {HERO_CONTENT.ctaSecondary.label}
          </a>
        </div>
      </div>
    </div>
  );
};

const NewsSection = ({ news }: { news: any[] }) => {
  return (
    <div id="results" className="bg-white border-y border-emerald-100 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-2 flex items-center">
              <Award className="mr-2 text-amber-400" size={28} /> 
              お知らせ
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              最新の情報をお届けします。
            </p>
          </div>
          <div className="md:w-2/3">
            <div className="bg-emerald-50/50 rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm">
              <ul className="space-y-2">
                {news.length === 0 ? (
                  <li className="text-slate-500 text-sm font-medium">現在お知らせはありません</li>
                ) : (
                  news.map((item: any, idx: number) => (
                    <li key={item.id || idx} className="border-b border-emerald-100/50 last:border-0 last:pb-0">
                      <a href={`/news/${item.id}`} className="group block py-3 px-3 -mx-3 rounded-2xl hover:bg-white transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full shrink-0 w-fit">
                            {/* サンプルデータ用にそのまま出力。実データ時はDateパースなど */}
                            {new Date(item.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}
                          </span>
                          <span className="text-slate-700 text-sm font-medium group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageTeaser = () => {
  return (
    <div id="message" className="relative bg-emerald-100/30 border-b border-emerald-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold mb-6">
              <Heart size={14} className="mr-2 fill-rose-100" /> 塾長メッセージ
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6 leading-tight">
              環境や経済格差で、<br/>
              「学び」を諦めてほしくない。
            </h2>
            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-8">
              なぜ、桑都塾は「自由な料金設定」なのか。<br/>
              なぜ、高専出身の私が塾を立ち上げたのか。<br/>
              不登校や発達障害支援の経験から生まれた、私の原点と信念をお伝えします。
            </p>
            <Link href="/message" className="inline-flex items-center text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-6 py-3 rounded-full font-bold transition-colors group shadow-sm">
                塾長の想いを読む <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
             <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-emerald-50 border-[6px] border-white flex items-center justify-center relative shadow-xl overflow-hidden group">
                {/* 実際の画像に差し替えてください */}
                <img 
                  src="/profile.jpeg" 
                  alt="河内 悠眞"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // フォールバック（画像がない場合）
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    e.currentTarget.className = "w-20 h-20 opacity-30";
                  }}
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">桑都塾 3つのポイント</h2>
          <p className="text-slate-500 font-medium">従来の塾の常識を覆す、生徒ファーストな仕組み</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-emerald-50/40 p-8 rounded-3xl border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-white shadow-sm border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-500"><Users size={28}/></div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">すべての子どもに教育を</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              経済格差や環境に左右されず、「勉強したい」と思うすべての子どもたちをサポート。不登校・発達障害・学習障害などの悩みにも、経験豊富な代表が寄り添います。
            </p>
          </div>
          <div className="bg-emerald-50/40 p-8 rounded-3xl border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-white shadow-sm border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-teal-500"><GraduationCap size={28}/></div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">一貫した教育を</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              小・中・高・大の一貫教育。「勉強の仕方」そのものを教え、自学自習で効率よく進める方法を伝授。高専生や大学生の単位取得・レポート作成も支援します。
            </p>
          </div>
          <div className="bg-emerald-50/40 p-8 rounded-3xl border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-white shadow-sm border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-lime-500"><Sparkles size={28}/></div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">自由な料金設定</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              月謝制ではなく「コマ時給制」を採用。「今月はテスト前だから多めに」「今月は少なめに」など、ご家庭の事情に合わせてフレキシブルに調整可能です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Campaigns = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-100/50 to-teal-50/50 border-y border-emerald-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-extrabold text-slate-800 mb-10 flex items-center justify-center">
          <Zap className="mr-2 text-amber-400" size={28} /> お得なキャンペーン実施中！
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/90 p-8 rounded-3xl border border-emerald-50 shadow-sm">
            <h4 className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold mb-4">390体験 / サンキュー価格</h4>
            <p className="text-xl font-extrabold text-slate-800 mb-3">3コマ激安体験！</p>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">たったの390円で初回3コマ（1コマ90分）を受講可能。内容はご自由に選択できます！</p>
          </div>
          <div className="bg-white/90 p-8 rounded-3xl border border-emerald-50 shadow-sm">
            <h4 className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-sm font-bold mb-4">紹介者割引</h4>
            <p className="text-xl font-extrabold text-slate-800 mb-3">1,000円引き！</p>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">紹介者が塾生の場合、双方の当該月の請求額から1,000円を割引させていただきます！</p>
          </div>
          <div className="bg-white/90 p-8 rounded-3xl border border-emerald-50 shadow-sm">
            <h4 className="inline-block px-3 py-1 rounded-full bg-lime-50 text-lime-600 text-sm font-bold mb-4">朝自習企画</h4>
            <p className="text-xl font-extrabold text-slate-800 mb-3">オンライン自習室</p>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">毎朝6:00〜7:55に開放。カメラオフ・出入り自由で、生活リズムの改善と学習習慣の定着を支援します。(一時休止中)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Course Modal Component ---
const CourseModal = ({ course, onClose }: { course: any, onClose: () => void }) => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  if (!course) return null;
  return (
    // 変更箇所 1: モーダル全体の背景 z-[100] -> z-[9990]
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      
      {/* 拡大画像モーダル */}
      {enlargedImage && (
        <div 
          // 変更箇所 2: 拡大画像の背景 z-[70] -> z-[9995]
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setEnlargedImage(null);
          }}
        >
          <button 
            // 変更箇所 3: 拡大画像の閉じるボタン z-[80] -> z-[9996]
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-[9996]"
            onClick={() => setEnlargedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={enlargedImage} 
            alt="拡大画像" 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 変更箇所 4: コース詳細モーダル本体 z-[101] -> z-[9991] */}
      <div className="relative z-[9991] bg-white rounded-3xl border border-emerald-100 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* ... 以降のコードはそのまま ... */}
        <div className={`h-3 w-full bg-gradient-to-r ${course.color || 'from-emerald-400 to-teal-500'}`} />
        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-3">{course.title}</h3>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full">対象: {course.target}</span>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-8">
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold text-emerald-700">{course.price}</span>
              <span className="text-slate-500 font-medium ml-2">{course.unit}</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed mb-8">{course.desc}</p>
            
            <div className="bg-emerald-50/50 rounded-3xl p-6 md:p-8 border border-emerald-100 mb-6">
              <h4 className="font-extrabold text-slate-800 mb-4 flex items-center"><BookOpen size={20} className="mr-2 text-emerald-500"/> 授業内容・特徴</h4>
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {course.detail || '生徒一人ひとりの状況に合わせたオーダーメイドカリキュラムを作成します。'}
              </p>
            </div>

            {/* 画像表示エリア */}
            {course.images && course.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {course.images.map((img: any, index: number) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => setEnlargedImage(img.url)}
                  >
                    <img 
                      src={img.url} 
                      alt={`${course.title} イメージ${index + 1}`}
                      className="w-full h-48 object-cover rounded-2xl border border-emerald-100 shadow-sm group-hover:shadow-md transition-all"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/20 rounded-2xl backdrop-blur-[2px]">
                      <ZoomIn className="text-white drop-shadow-md" size={32} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* 画像がない場合はプレースホルダーを表示（通常のコースのみ） */
              course.id !== 'past-exam' && (
                <div className="bg-slate-50 h-48 rounded-3xl flex items-center justify-center border-2 border-dashed border-emerald-100 mb-6 text-slate-400">
                  <div className="text-center">
                    <FileText size={32} className="mx-auto mb-2 text-emerald-200" />
                    <span className="text-sm font-medium">授業ノート・資料イメージ</span>
                  </div>
                </div>
              )
            )}

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-emerald-50">
            <button onClick={onClose} className="px-5 py-2.5 text-slate-500 hover:text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-sm">閉じる</button>
            <a href="https://forms.gle/89xACDb9c1EADi2G9" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-200 transition-colors">
              このコースについて相談する
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseList = ({ courses }: { courses: any[] }) => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // CMSデータがない場合はデフォルト定数を使用
  const displayCourses = courses && courses.length > 0 ? courses : COURSES;

  return (
    <div id="courses" className="py-24 bg-emerald-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">Course & Price</h2>
          <p className="text-slate-600 font-medium">多岐にわたる学科編成。オンライン指導で全国どこからでも受講可能。</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayCourses.map((course) => (
            <div key={course.id} className="group relative bg-white rounded-3xl border border-emerald-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all overflow-hidden flex flex-col transform hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${course.color || 'from-emerald-400 to-teal-400'}`} />
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-extrabold text-slate-800">{course.title}</h3>
                </div>
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 inline-block px-3 py-1.5 rounded-full mb-5">
                  対象: {course.target}
                </p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-extrabold text-emerald-700">{course.price}</span>
                  <span className="text-slate-500 font-medium ml-1">{course.unit}</span>
                </div>
                <p className="text-slate-600 text-sm font-medium mb-6 leading-relaxed line-clamp-3">
                  {course.desc}
                </p>
                <ul className="space-y-3 mb-6">
                  {course.features && (Array.isArray(course.features) ? course.features : course.features.split(',')).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center text-sm font-bold text-slate-700">
                      <CheckCircle size={16} className="mr-3 text-emerald-500" />
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold rounded-2xl transition-colors border border-emerald-200"
                >
                  詳細を見る
                </button>
              </div>
            </div>
          ))}
          
          {/* 過去問添削講座 (オプション) */}
          <div className="bg-white/60 rounded-3xl border-2 border-dashed border-emerald-200 p-8 flex flex-col justify-center text-center min-h-[300px] hover:border-emerald-400 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md" onClick={() => setSelectedCourse(PAST_EXAM_COURSE)}>
            <div className="mb-5 text-rose-400 bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileText size={28} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">過去問添削講座</h3>
            <p className="text-slate-500 text-sm font-medium mb-5">月額定額制で何度でも添削可能</p>
            <p className="text-2xl font-extrabold text-rose-500 mb-1">¥7,975<span className="text-lg">~</span></p>
            <span className="text-xs font-medium text-slate-400 mb-6">/月 (中学受験の場合)</span>
            <span className="text-emerald-600 font-bold text-sm bg-emerald-50 inline-block mx-auto px-4 py-1.5 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
              詳しくはこちら
            </span>
          </div>

          {/* 対面授業講座 (オプション) */}
          <div className="bg-white/60 rounded-3xl border-2 border-dashed border-emerald-200 p-8 flex flex-col justify-center text-center min-h-[300px] hover:border-emerald-400 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md" onClick={() => setSelectedCourse(FACE_TO_FACE_COURSE)}>
            <div className="mb-5 text-amber-500 bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Car size={32} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">対面授業講座</h3>
            <p className="text-slate-500 text-sm font-medium mb-5">訪問または事務所での直接指導</p>
            <p className="text-2xl font-extrabold text-amber-600 mb-1">+¥300</p>
            <span className="text-xs font-medium text-slate-400 mb-6">/時間 (追加料金)</span>
            <span className="text-emerald-600 font-bold text-sm bg-emerald-50 inline-block mx-auto px-4 py-1.5 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
              詳しくはこちら
            </span>
          </div>
        </div>

        {/* 減免制度案内 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-8 rounded-3xl max-w-3xl mx-auto shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-amber-200/50">
             <Sparkles size={100} />
          </div>
          <div className="relative z-10">
            <h4 className="text-lg font-extrabold text-amber-800 mb-3 flex items-center">
              <Sparkles className="text-amber-500 mr-2" size={24} /> 授業料減免制度について
            </h4>
            <p className="text-amber-900/80 text-sm font-medium leading-relaxed">
              経済的に困窮している、又は生徒さんご自身がお支払いしている場合にのみ特別価格で授業を受講できる制度です。<br/>
              当塾のモットー「すべての子どもに教育を」に基づき、<strong>¥1,313(1時間あたり)から言い値で</strong>授業実施させていただきます。必ず事前にご相談ください。
            </p>
          </div>
        </div>
      </div>

      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
    </div>
  );
};

const ClassList = ({ activeClasses, pastClasses }: { activeClasses?: any[], pastClasses?: any[] }) => {
  // CMSデータがない場合はフォールバックの定数を使用
  const displayActive = activeClasses && activeClasses.length > 0 ? activeClasses : ACTIVE_CLASSES;
  const displayPast = pastClasses && pastClasses.length > 0 ? pastClasses : PAST_CLASSES;

  return (
    <div id="classes" className="py-24 bg-white border-y border-emerald-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">Classes</h2>
          <p className="text-slate-500 font-medium">現在開講中の授業と、過去の実施実績</p>
        </div>

        {/* 開講中の授業をすべて表示 */}
        <div className="mb-16">
          <h3 className="text-xl font-extrabold text-emerald-600 mb-6 flex items-center border-b-2 border-emerald-50 pb-3">
            <PlayCircle size={24} className="mr-2 text-emerald-500" /> 開講中の授業
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {displayActive.map((cls: any, idx: number) => (
              <div key={idx} className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex flex-col h-full hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-emerald-600 border border-emerald-100 shadow-sm">
                    {cls.target}
                  </span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-800 mb-5 flex-1 leading-snug">{cls.title}</h4>
                {cls.instructor && (
                  <div className="text-xs font-bold text-slate-500 border-t border-emerald-100/60 pt-4 mt-auto flex items-center">
                    <Users size={16} className="mr-2 text-emerald-400" />
                    担当: {cls.instructor}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 過去の授業をすべて表示 */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-500 mb-6 flex items-center border-b-2 border-slate-50 pb-3">
            <History size={24} className="mr-2 text-slate-400" /> 過去の授業
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {displayPast.map((cls: any, idx: number) => (
              <div key={idx} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex flex-col h-full hover:bg-slate-50 transition-colors">
                <div className="mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white text-slate-500 border border-slate-200 shadow-sm">
                    {cls.target}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-600 flex-1 leading-snug">{cls.title}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const Instructors = ({ instructors }: { instructors: any[] }) => {
  // CMSデータがない場合はデフォルト定数を使用
  const displayInstructors = instructors && instructors.length > 0 ? instructors : INSTRUCTORS;

  return (
    <div id="instructors" className="py-24 bg-emerald-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">Instructors</h2>
          <p className="text-slate-600 font-medium">現役大学生、コンサルタント、教育学部生、留学経験豊富な講師など、多彩なバックグラウンドを持つ講師陣です！</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayInstructors.map((inst, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xl mr-4 border border-emerald-200 shrink-0 shadow-inner">
                  {inst.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-baseline gap-2 overflow-hidden">
                    <h4 className="text-xl font-extrabold text-slate-800 truncate">{inst.name}</h4>
                    {/* ※font-sm は存在しないクラスなので外して、text-xs のみにしています */}
                    <p className="text-sm font-bold text-slate-500 truncate">{inst.kana}</p>
                    </div>
                    <p className="text-sm font-bold text-emerald-600 truncate">{inst.role}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 mb-4 flex items-center truncate bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100 w-fit">
                <GraduationCap size={14} className="mr-1.5 text-slate-400" /> {inst.univ}
              </p>
              <p className="text-slate-600 text-sm font-medium mb-6 leading-relaxed">
                {inst.msg}
              </p>
              <div className="flex flex-wrap gap-2">
                {inst.tags && (Array.isArray(inst.tags) ? inst.tags : inst.tags.split(',')).map((tag: string, i: number) => (
                  <span key={i} className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Flow = () => {
  const steps = [
    { title: '体験授業のお申込み', desc: '緑のお申込みフォームから「390体験」にお申込みください。' },
    { title: '日程調整', desc: '担当者からご連絡させていただき、日時を決定します。' },
    { title: '体験授業', desc: 'Google Meetにて実際の授業を体験していただきます。' },
    { title: 'ご入塾の手続き', desc: 'Adobe Signにて電子契約を行い、正式に入塾となります。' },
  ];

  return (
    <div className="py-24 bg-white border-t border-emerald-100 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-16">ご入塾までの流れ</h2>
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex md:items-center group">
              <div className="flex flex-col items-center mr-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-200 text-emerald-700 flex items-center justify-center font-black text-xl z-10 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all shadow-sm">
                  {idx + 1}
                </div>
                {idx !== steps.length - 1 && <div className="h-full w-0.5 bg-emerald-100 my-2" />}
              </div>
              <div className="bg-emerald-50/50 p-6 md:p-8 rounded-3xl border border-emerald-100 flex-1 hover:bg-white hover:shadow-md transition-all">
                <h3 className="text-lg font-extrabold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 font-medium text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
           <a href="https://forms.gle/89xACDb9c1EADi2G9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-full shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1">
             <Zap className="mr-2" size={20} /> 今すぐ390体験に申し込む
           </a>
        </div>
      </div>
    </div>
  );
};

// 問い合わせFAB (Floating Action Button)
const FixedCTAButton = () => {
  return (
    <a 
      href="https://forms.gle/89xACDb9c1EADi2G9" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center"
    >
      <div className="bg-white text-emerald-700 text-xs font-bold py-2.5 px-5 rounded-l-full border border-emerald-100 shadow-xl translate-x-2 group-hover:translate-x-0 transition-transform">
        体験授業・コース診断はこちら
      </div>
      <div className="bg-emerald-500 p-4 rounded-full shadow-2xl shadow-emerald-400/50 hover:scale-110 transition-transform animate-bounce-subtle flex items-center justify-center">
        <MessageSquare className="text-white" size={28} />
      </div>
    </a>
  );
};

export default function TopPage({ 
  news = [], 
  courses = [], 
  instructors = [], 
  activeClasses = [],
  pastClasses = []
}: { 
  news?: any[], 
  courses?: any[], 
  instructors?: any[],
  activeClasses?: any[],
  pastClasses?: any[]
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-emerald-200">
      <Navbar />
      <main>
        <Hero />
        <NewsSection news={news} />
        <Features />
        <MessageTeaser />
        <Campaigns />
        <CourseList courses={courses} />
        <ClassList activeClasses={activeClasses} pastClasses={pastClasses} />
        <Instructors instructors={instructors} />
        <Flow />
      </main>
        <Footer />
      <FixedCTAButton />
    </div>
  );
}