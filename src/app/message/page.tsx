'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Heart, Users, Lightbulb, 
  Target, Sparkles, Mail
} from 'lucide-react';

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function MessagePage() {
  return (
    // ベース背景にほんのりエメラルドを加え、全体に色味を持たせます
    <div className="min-h-screen bg-emerald-50 font-sans text-slate-700 ...">
  
      {/* グラデーションの透明度を上げ、via を外してスッキリさせる */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-emerald-100 to-transparent -z-10" />
      
      <Navbar />

      <main className="flex-1 py-24 px-4 sm:px-6 mt-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* 戻るボタン */}
          <Link href="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-bold mb-12 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full border border-emerald-100 shadow-sm hover:shadow transition-all group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> トップへ戻る
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-sm font-bold mb-6 shadow-sm">
                <Heart size={16} className="mr-2 fill-rose-100" />
                代表メッセージ
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight tracking-tight">
                環境や経済的な理由で、<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500">
                    「学び」をあきらめてほしくない。
                </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                桑都塾が目指すのは、単なる成績アップのための場所ではありません。<br/>
                すべての子どもたちが、のびのびと未来を描ける場所です。
            </p>
          </div>

          {/* メインコンテンツ（記事風カード） */}
          <article className="bg-white rounded-[2rem] p-8 md:p-14 border border-emerald-50 shadow-xl shadow-emerald-900/5 relative mb-12">
            
            {/* Story Section 1: 原点 */}
            <section className="mb-16">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mr-4 border border-emerald-100 shadow-sm">
                        <Users size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">原点は、中学時代の「お節介」</h2>
                </div>
                <div className="prose prose-lg prose-emerald max-w-none prose-p:text-slate-600 prose-p:leading-loose prose-strong:text-slate-800">
                    <p>
                        私が教育に興味を持つようになったのは、かれこれ9年前の中学時代に遡ります。私の通っていた公立中学は、偏差値38程度と、お世辞にも「頭が良い」とは言えない学校でした。
                        どんどん下がっていく学力をなんとかしようと、先生方も必死で「大量の課題」や「朝の自習タイム」を導入してくれましたが、結局どれも不発。私のような「ある程度できる」生徒にとっては無駄な課題が増えるだけで苦痛でしたし、クラスメイトの中には、その基礎的な課題すらわからずに頭を抱えている子が何人もいました。
                        そんな彼らを放っておけず、自然と「教えてあげたい！」という気持ちが芽生えた私は、勝手に空き教室を借りて、テスト前になるたびに対策講義を開くような「お節介」な生徒でした。（案の定、先生には怒られましたが 笑）
                        でも、今思えばそこが私の「教育の原点」なんです。
                    </p><br></br>
                    <p>
                        その後、私はその中学から10年以上ぶりに国立の高専に進学したのですが、そこで最初の授業から周りとの能力差に衝撃を受けました。「自分の実力ってこんなもんだったのか…」と本気でへこみましたね。
                        でも、高専の先生方は優しく、いろんなことを教えてくれました。それをヒントに、1年生の冬休みに自分で自分に「特訓」を課すことにしたんです。
                        とにかく予習をすること。多くの問題を解くこと。わからないところはすぐに聞くこと。これを冬休みの2週間、毎日17時間近く狂ったように続けました。
                        その結果、数学は60点（赤点ギリギリ）から90点台へ、物理は15点からほぼ満点へと劇的に成績が上がったんです。
                        ここで私はハッとしました。「あ、勉強ができないのって、頭が悪いからじゃない。単に『やり方』を知らないだけなんだ」と。
                    </p><br></br>
                    <p>
                        「やり方」さえしっかり教えれば、今勉強ができなくて悩んでいる同級生や後輩たちも絶対に成績を上げられる。そう思っていた矢先、学内のウェルネスセンター（保健室のようなところ）から声をかけていただき、学生同士で教え合う「ピアサポート活動」を立ち上げることになりました。
                        そこには、勉強の悩みだけでなく、発達障害や学習障害（LD）を持っている生徒、なかなか学校に通えていない生徒など、本当にさまざまな悩みを抱えた子たちがたくさん来てくれました。（もちろん、社会福祉士の専門的なサポートを受けながらの活動です）
                    </p><br></br>
                    <p>
                        結果として、活動を終了するまでの2年間で、20名以上の生徒を留年の危機から救うことができました。ここで私が学んだのは、「適切なサポートと環境さえあれば、人は誰でも変われる」という紛れもない事実です。
                    </p>
                </div>
            </section>

            {/* Story Section 2: 編入受験という高い壁、桑都塾の原点 */}
            <section className="pt-16 border-t border-emerald-50">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-lime-500 mr-4 border border-lime-100 shadow-sm">
                        <Lightbulb size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">編入受験という高い壁、桑都塾の原点</h2>
                </div>
                <div className="prose prose-lg prose-emerald max-w-none prose-p:text-slate-600 prose-p:leading-loose prose-strong:text-slate-800">
                    <p>
                        ピアサポート活動にのめり込んでいた3年次の頃、1つの大きな分岐点が訪れました。それは、「自分が編入受験をする」か「編入受験を目指す同級生のサポートをする」か。
                        当時、私自身も東京工大（現：東京科学大）を目指して勉強していましたが、正直なところ「自分のために」より「誰かのために」役に立ちたいという思いの方が、はるかに上回ってしまったんです。
                    </p><br></br>
                    <p>
                        そんなこんなで私が下した決断は、ご存知の通り、「同級生のサポート」でした。同級生からお金をいただいて授業をすることに最初はプレッシャーもありましたが、生徒のためにカリキュラムを試行錯誤し、テキストを作り、合格までの道を一緒に作っていく楽しさに、どんどんのめり込んでいきました。結果的に3校の合格を導くことができ、この経験は今の私の大きな自信になっています。
                    </p><br></br>
                    <p>
                        その後、「もっと現場を知りたい！」と思い切って飛び込んだ進学塾でのアルバイト。大人数を相手にする集団授業にはじめは戸惑いましたが、工夫次第で一人ひとりにしっかり寄り添えることに気づき、「これを自分の手で、もっと自由に、もっと本気でやりたい」と思うようになりました。
                        これが、「桑都塾」として独立を決意した理由です。
                    </p>
                </div>
            </section>

            {/* Story Section 3: 信念 */}
            <section className="mb-16 pt-16 border-t border-emerald-50">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500 mr-4 border border-teal-100 shadow-sm">
                        <Target size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">すべての子どもに教育を</h2>
                </div>
                <div className="prose prose-lg prose-emerald max-w-none prose-p:text-slate-600 prose-p:leading-loose prose-strong:text-slate-800">
                    <p>
                        塾講師として働く中で、「この子にもっと教えてあげたいのに」と歯がゆい思いを何度もしました。進学塾の月謝は高く、経済的な理由で通うのが難しいご家庭にとっては大きな壁になります。
                        「お金がないから」「環境が悪いから」という理由で、学びたい意欲のある子が機会を奪われる社会は絶対におかしい。
                    </p>
                    <p>
                        だからこそ、桑都塾は<strong>「自由な料金設定」</strong>と<strong>「低価格」</strong>にこだわります。
                        固定の月謝制ではなく、ご家庭の事情に合わせて柔軟に調整できる1コマ単位での受講システムを採用し、敷居をできる限り低くしました。
                    </p>
                    
                    {/* 引用ブロックのデザイン */}
                    <blockquote className="border-l-4 border-emerald-400 bg-emerald-50/50 p-6 rounded-r-2xl my-8 italic text-slate-700 font-medium">
                        「年齢、経済格差、環境に左右されず、勉強したいと思うすべての子どもたちにのびのびと勉強してほしい」
                    </blockquote>
                    
                    <p>
                        これが、私たちが一番大切にしている信念です。
                        不登校、発達障害、学習障害などに悩まれている方も、どうか一人で抱え込まず、私たちに相談してください。
                        経済的な面も含め、一緒に考えて全力でサポートいたします。
                    </p>
                </div>
            </section>
          </article>

          {/* Profile Section */}
          <div className="bg-white rounded-[2rem] p-8 md:p-14 border border-emerald-50 shadow-xl shadow-emerald-900/5 relative mb-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50/80 rounded-bl-[100px] z-0"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="shrink-0">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-emerald-50 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                          <img 
                              src="/profile.jpeg" 
                              alt="河内 悠眞"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                                e.currentTarget.className = "w-1/2 h-1/2 opacity-30";
                              }}
                          />
                      </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-extrabold text-slate-800 mb-1">河内 悠眞</h3>
                      <p className="text-emerald-600 text-sm font-bold mb-5 bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-100">
                          Yuma Kawachi / 桑都塾 代表
                      </p>
                      
                      <div className="space-y-3 text-sm text-slate-600 font-medium text-left">
                          <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              2005年2月7日 東京生まれ (21歳)
                          </p>
                          <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              元・東京高専 (電子工学科)
                          </p>
                          <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              指導経験6年目
                          </p>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-emerald-50 text-sm text-slate-600 leading-loose text-left font-medium">
                          東京高専在学中に「ピアサポート活動」を設立し、第一人者として20人以上の生徒を留年の危機から救う。
                          その後、株式会社臨海にて準契約社員として勤務し、在籍80人を超える校舎の理系主力講師を務める。
                          2025年1月より個人事業主として桑都塾を本格始動。「なんでもする塾」を目指し、八王子から教育のアップデートに挑む。
                      </div>
                  </div>
              </div>
          </div>

          {/* CTA Section */}
          <section className="py-12 px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
                  まずは一度、お話しませんか？
              </h2>
              <p className="text-slate-600 mb-10 max-w-xl mx-auto font-medium">
                  お子様の学習状況、進路の悩み、経済的なご相談まで。<br/>
                  どんなことでも構いません。私たちが力になります。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {/* 必要に応じて無料体験の実際のURLに差し替えてください */}
                  <a href="https://forms.gle/89xACDb9c1EADi2G9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all shadow-lg shadow-emerald-200 hover:-translate-y-1">
                      <Sparkles className="mr-2" size={20} />
                      無料体験・相談を予約する
                  </a>
                  <a href="mailto:yuma@soutojuku.com" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200 shadow-sm transition-colors">
                      <Mail className="mr-2 text-emerald-500" size={20} />
                      メールで問い合わせる
                  </a>
              </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}