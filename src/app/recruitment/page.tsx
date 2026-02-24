'use client';

import React from 'react';
import { 
  Briefcase, CheckCircle, ChevronRight, Clock, 
  Laptop, Mail, MonitorPlay, 
  Phone, Sparkles, Target, Users, AlertCircle, FileText, MessageSquare
} from 'lucide-react';

import Link from 'next/link';
import { Navbar } from "../../components/Navbar"; // ※パスは環境に合わせてください
import { Footer } from "../../components/Footer";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-emerald-200 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-emerald-50">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-200 bg-white/60 text-emerald-700 text-sm font-bold mb-8 shadow-sm backdrop-blur-sm">
                    <Briefcase size={16} className="mr-2 text-teal-600" />
                    採用情報 / Recruitment
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-tight">
                    テクノロジーと情熱で、<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                        「学ぶ喜び」を届ける。
                    </span>
                </h1>
                <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                    桑都塾では、生徒一人ひとりに寄り添い、共に成長できる仲間を募集しています。<br/>
                    完全リモート・柔軟なシフトで、あなたのスキルを教育の現場で活かしませんか？
                </p>
            </div>
        </section>

        {/* --- 募集状況一覧 --- */}
        <section className="py-16 bg-white border-y border-emerald-100 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center">
              <Target className="mr-3 text-emerald-500" /> 現在の募集状況
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* 募集中 (非常勤) */}
              <div className="bg-emerald-50/50 border border-emerald-200 p-8 rounded-3xl relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">募集中</div>
                <h3 className="text-xl font-extrabold text-slate-800 mb-2">非常勤講師 <span className="text-base font-bold text-slate-500">(理系・文系)</span></h3>
                <p className="text-sm font-medium text-slate-600 mb-6">完全リモート / 週1日・1コマからOK</p>
                <a href="#req-part-time" className="text-emerald-600 text-sm font-bold flex items-center group-hover:text-emerald-500 transition-colors">
                  募集要項を見る <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* 募集中 (専任) */}
              <div className="bg-teal-50/50 border border-teal-200 p-8 rounded-3xl relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">募集中</div>
                <h3 className="text-xl font-extrabold text-slate-800 mb-2">専任講師 <span className="text-base font-bold text-slate-500">(文系: 英語)</span></h3>
                <p className="text-sm font-medium text-slate-600 mb-6">コアタイムなしのフルフレックス風・社用携帯貸与</p>
                <a href="#req-full-time" className="text-teal-600 text-sm font-bold flex items-center group-hover:text-teal-500 transition-colors">
                  募集要項を見る <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* 募集停止 (非常勤事務) */}
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative opacity-80">
                <div className="absolute top-0 right-0 bg-slate-300 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-bl-xl">募集停止中</div>
                <h3 className="text-xl font-bold text-slate-500 mb-2">非常勤事務</h3>
                <p className="text-sm font-medium text-slate-400">現在、募集を見合わせております。</p>
              </div>

              {/* 募集停止 (専任事務) */}
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative opacity-80">
                <div className="absolute top-0 right-0 bg-slate-300 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-bl-xl">募集停止中</div>
                <h3 className="text-xl font-bold text-slate-500 mb-2">専任事務</h3>
                <p className="text-sm font-medium text-slate-400">現在、募集を見合わせております。</p>
              </div>

            </div>
          </div>
        </section>

        {/* --- 募集要項：非常勤講師 --- */}
        <section id="req-part-time" className="py-24 relative z-10 scroll-mt-20 border-b border-emerald-50 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6">募集要項：非常勤講師</h2>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 md:p-8 rounded-r-3xl shadow-sm">
                <p className="text-slate-700 font-medium leading-relaxed">
                  お世話になっております。桑都塾の河内悠眞です。<br/>
                  この度桑都塾では、一緒に働いてくださる講師の方を一般募集することとなりました。<br/>
                  今回の募集は理系講師がメインとなりますが、<strong className="text-emerald-700 font-extrabold">「文系しか無理だけど働いてみたい！」</strong>という方でも、ぜひ一度ご連絡ください！
                </p>
              </div>
            </div>

            <div className="space-y-16">
              
              {/* 仕事内容 */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-emerald-50 pb-3">
                  <Laptop className="mr-3 text-emerald-500" /> 仕事内容
                </h3>
                <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 md:p-8 space-y-8">
                  <div>
                    <h4 className="text-emerald-700 font-extrabold mb-5 flex items-center">
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1.5 rounded-lg mr-3 shadow-sm border border-emerald-200">雇入れ直後</span> 
                      採用直後の業務内容
                    </h4>
                    <ul className="space-y-6 text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                      <li className="flex items-start">
                        <MonitorPlay size={20} className="mr-4 mt-0.5 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-slate-800 font-extrabold block mb-1">オンライン学習指導 (1コマ90分):</strong>
                          Google Meetを使用し、さまざまな学科の理系科目（算数・数学・理科など）の個別指導を行っていただきます。自身のiPadやタブレットを使用し、生徒に分かりやすい板書を提示しながら授業を進めてください。<br/>
                          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block mt-2 border border-emerald-100">※Goodnotesライセンスを当塾より付与します。</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <MonitorPlay size={20} className="mr-4 mt-0.5 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-slate-800 font-extrabold block mb-1">授業の録画と共有:</strong>
                          授業の様子を録画し、終了後に板書PDFと併せて指定のGoogle Driveフォルダへアップロードしていただきます。
                        </div>
                      </li>
                      <li className="flex items-start">
                        <MonitorPlay size={20} className="mr-4 mt-0.5 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-slate-800 font-extrabold block mb-1">定時報告（業務報告）:</strong>
                          一日の業務終了後、指導内容や生徒の様子をメール（定時報告）にて報告していただきます。
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-teal-700 font-extrabold mb-3 flex items-center">
                      <span className="bg-teal-100 text-teal-700 text-xs px-3 py-1.5 rounded-lg mr-3 shadow-sm border border-teal-200">変更の範囲</span> 
                      業務内容の変更範囲 (将来・希望者のみ)
                    </h4>
                    <p className="text-sm md:text-base font-medium text-slate-600 leading-relaxed ml-14">
                      将来的に、公式LINEを用いた保護者対応や、オリジナル教材・演習プリント作成等の業務をお願いする場合があります。
                    </p>
                  </div>
                </div>
              </div>

              {/* 業務の流れ */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-emerald-50 pb-3">
                  <Clock className="mr-3 text-emerald-500" /> 具体的な業務の流れ
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <div className="text-emerald-600 font-extrabold mb-3 text-lg">① 授業前</div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">カリキュラムの確認と、必要に応じた教材研究（授業準備）。</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <div className="text-emerald-600 font-extrabold mb-3 text-lg">② 授業中</div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">生徒への講義および演習管理。</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <div className="text-emerald-600 font-extrabold mb-3 text-lg">③ 授業後</div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">板書・録画データの格納と、定時報告メールの作成・送信。</p>
                  </div>
                </div>
              </div>

              {/* やりがい・身につくスキル */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-emerald-50 pb-3">
                  <Sparkles className="mr-3 text-emerald-500" /> やりがい・身につくスキル
                </h3>
                <div className="space-y-6">
                  
                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 hover:bg-white hover:shadow-md transition-all">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 text-emerald-500">
                        <Users size={28} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-lg mb-3">生徒の「わかった！」を一番近くで実感できる</h4>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        ほぼ個別指導のスタイルであるため、生徒一人ひとりの理解度や悩みに深く寄り添うことができます。苦手だった科目に対して、生徒が自信を持つ瞬間を共有できることは、講師ならではの大きな達成感です。
                      </p>
                    </div>
                  </div>

                  <div className="bg-teal-50/50 border border-teal-100 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 hover:bg-white hover:shadow-md transition-all">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-teal-100 text-teal-500">
                        <Target size={28} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-lg mb-3">3ヶ月に1回の評価で、成長が報酬に直結</h4>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        単に時間を切り売りするのではなく、「3ヶ月に1回の評価」に基づき指導時給の等級を見直す制度を整えています。指導スキルや業務への取り組みが客観的に評価され、報酬アップに直結するため、高いモチベーションを維持できます。
                      </p>
                    </div>
                  </div>

                  <div className="bg-lime-50/50 border border-lime-100 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 hover:bg-white hover:shadow-md transition-all">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-lime-100 text-lime-600">
                        <Briefcase size={28} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-lg mb-3">「一生モノのビジネススキル」が身につく</h4>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                        将来どのような職業に就く際にも必須となる社会人の基礎スキルを、実務を通して磨くことができます。
                      </p>
                      <ul className="text-sm font-medium text-slate-600 space-y-3">
                        <li className="flex items-start">
                            <span className="text-lime-500 mr-2">◆</span>
                            <span><strong className="text-slate-800">プロとしての顧客対応：</strong>保護者様を顧客と捉え、最上級の敬語やビジネスマナーを学びます。</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-lime-500 mr-2">◆</span>
                            <span><strong className="text-slate-800">「報連相」の徹底：</strong>毎日の定時報告や情報共有フローを通じ、組織運営の基本が身につきます。</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-lime-500 mr-2">◆</span>
                            <span><strong className="text-slate-800">高度なITリテラシー：</strong>Google Workspace、Notion、Discordなど最新ツールの活用スキルが身につきます。</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* 募集条件 */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center border-b border-emerald-50 pb-3">
                    <CheckCircle className="mr-2 text-emerald-500" /> 対象者
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-emerald-400 shrink-0" /> 
                        <span>学歴/職歴不問 <span className="text-xs font-medium text-slate-500 block mt-1">(教えること=学歴とは結びつきません！)</span></span>
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-emerald-400 shrink-0" /> 未経験・無資格可
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-emerald-400 shrink-0" /> 18歳以上 (業務委託契約のため)
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center border-b border-emerald-50 pb-3">
                    <Sparkles className="mr-2 text-amber-400" /> 歓迎条件
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-amber-500 shrink-0" /> 塾講師としての指導経験
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-amber-500 shrink-0" /> 大学での教養理系科目等の受講経験
                    </li>
                  </ul>
                </div>
              </div>

              {/* 報酬・勤務詳細 */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-emerald-50 pb-3">
                  <FileText className="mr-3 text-emerald-500" /> 報酬・契約・勤務時間
                </h3>
                
                <div className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm">
                  <table className="w-full text-left text-sm md:text-base font-medium text-slate-700">
                    <tbody>
                      <tr className="border-b border-emerald-50 flex flex-col md:table-row">
                        <th className="w-full md:w-1/3 bg-emerald-50/50 p-5 md:p-6 font-extrabold text-slate-800">雇入時の時給</th>
                        <td className="p-5 md:p-6 space-y-3">
                          <div className="flex justify-between max-w-xs">
                            <span className="text-slate-500">指導時給：</span>
                            <span className="font-extrabold text-emerald-600 text-lg">¥1,240 /h 〜</span>
                          </div>
                          <div className="flex justify-between max-w-xs">
                            <span className="text-slate-500">事務時給：</span>
                            <span className="font-extrabold text-slate-800">¥1,226 /h</span>
                          </div>
                          <div className="flex justify-between max-w-xs pb-3 border-b border-slate-100">
                            <span className="text-slate-500">研修時給：</span>
                            <span className="font-extrabold text-slate-800">¥1,226 /h</span>
                          </div>
                          <ul className="text-xs text-slate-500 mt-3 space-y-1 list-disc list-inside">
                            <li>指導時給は授業時間に対して1分単位で支給し、3ヶ月毎の評価で昇給の機会があります。</li>
                            <li>指導未経験の方は最初の3ヶ月間を研修期間とし、研修時給を適用します。</li>
                            <li>事務・研修時給は東京都の最低賃金に連動して改定します。</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="border-b border-emerald-50 flex flex-col md:table-row">
                        <th className="bg-emerald-50/50 p-5 md:p-6 font-extrabold text-slate-800">勤務時間・場所</th>
                        <td className="p-5 md:p-6">
                          <p className="mb-2 text-slate-800"><strong className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mr-1">原則 11:00〜23:00</strong> のうち、1コマ(90分)単位。<br/>週1日、1コマから可能です！</p>
                          <p className="mb-4 text-slate-800"><strong className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">完全リモート（在宅勤務）</strong></p>
                          <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                            <li>授業以外の事務作業（定時報告作成など）も1分単位で自己申告していただき、事務給をお支払いします。</li>
                            <li>業務委託契約のため深夜手当（割増）は適用されません。</li>
                            <li>了承が得られた方のみ、臨時的に事務所(八王子)への出勤をお願いする場合があります。</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="flex flex-col md:table-row">
                        <th className="bg-emerald-50/50 p-5 md:p-6 font-extrabold text-slate-800">契約形態</th>
                        <td className="p-5 md:p-6">
                          <p className="mb-3 text-slate-800"><strong className="font-extrabold border-b-2 border-emerald-300 pb-0.5">業務委託契約</strong></p>
                          <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                            <li>給与所得ではなく「事業所得」となり、年間報酬が20万円を超えると確定申告が必要です。</li>
                            <li>労働基準法は直接適用されませんが、当塾では実質的に法に則ったクリーンな報酬支払いを実施しています。</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex items-start bg-amber-50/50 p-5 md:p-6 rounded-2xl border border-amber-100">
                  <AlertCircle size={24} className="text-amber-500 mt-0.5 mr-4 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    <strong className="font-extrabold text-slate-800 block mb-1">【使用する主なツールについて】</strong>
                    Google Meet / Spread Sheet / Docs / Drive / Calendar / Chat、および LINE公式アカウント 等を使用します。パソコンに強くない方でも、研修でしっかりサポートしますのでご安心ください！
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 募集要項：専任講師 --- */}
        <section id="req-full-time" className="py-24 relative z-10 scroll-mt-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6">募集要項：専任講師 <span className="text-xl font-bold text-slate-500 ml-2">(文系: 英語)</span></h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 md:p-8 rounded-r-3xl shadow-sm">
                <p className="text-slate-700 font-medium leading-relaxed">
                  桑都塾の中核を担う「専任講師」の募集要項です。非常勤講師とは異なり、生徒管理や保護者対応、さらには塾の運営に深く関わっていただくポジションとなります。フルフレックスに近い柔軟な働き方で、あなたの英語力と教育への情熱を最大限に発揮してください。
                </p>
              </div>
            </div>

            <div className="space-y-16">
              
              {/* 仕事内容 */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-teal-50 pb-3">
                  <Laptop className="mr-3 text-teal-500" /> 仕事内容
                </h3>
                <div className="bg-white rounded-3xl border border-teal-100 shadow-sm p-6 md:p-8 space-y-8">
                  <div>
                    <h4 className="text-teal-700 font-extrabold mb-5 flex items-center">
                      <span className="bg-teal-100 text-teal-700 text-xs px-3 py-1.5 rounded-lg mr-3 shadow-sm border border-teal-200">雇入れ直後</span> 
                      採用直後の業務内容
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed mb-4">
                      英語を中心とした<strong className="text-teal-600">学習指導</strong>に加え、以下の幅広い業務をお任せします。
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm font-bold">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">事務作業</span>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">生徒管理</span>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">教材作成</span>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">保護者対応</span>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">営業</span>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">電話対応</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-slate-600 font-extrabold mb-3 flex items-center">
                      <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg mr-3 shadow-sm border border-slate-200">変更の範囲</span> 
                      業務内容の変更範囲
                    </h4>
                    <p className="text-sm md:text-base font-medium text-slate-600 leading-relaxed ml-14">
                      一般事務
                    </p>
                  </div>
                </div>
              </div>

              {/* 業務の流れ */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-teal-50 pb-3">
                  <Clock className="mr-3 text-teal-500" /> 具体的な業務の流れ
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-teal-50/50 border border-teal-100 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <div className="text-teal-600 font-extrabold mb-3 text-lg">勤務前</div>
                    <ul className="text-sm font-medium text-slate-600 leading-relaxed list-disc list-inside space-y-2">
                        <li>半月ごとに出勤日の確認を行います。</li>
                        <li>勤務開始時刻となる前に、出勤・退勤マクロより出勤報告をお願いいたします。</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50/50 border border-teal-100 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <div className="text-teal-600 font-extrabold mb-3 text-lg">勤務中</div>
                    <ul className="text-sm font-medium text-slate-600 leading-relaxed list-disc list-inside space-y-2">
                        <li>授業の合間は教材研究を行い、授業の質を高めてください。</li>
                        <li>上長からの指示業務への対応。</li>
                        <li><strong className="text-slate-800">貸与する社用携帯</strong>への着信対応。（授業中に出られなかった場合は必ず折り返し連絡）</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50/50 border border-teal-100 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">重要</div>
                    <div className="text-teal-600 font-extrabold mb-3 text-lg">勤務後</div>
                    <ul className="text-sm font-medium text-slate-600 leading-relaxed list-disc list-inside space-y-2">
                        <li>勤務時間内に【定時報告】を行ってください。</li>
                        <li className="text-rose-600 font-bold">※専任の定時報告期限は「勤務時間中」です。</li>
                    </ul>
                  </div>
                </div>

                {/* 残業代についてのアラート */}
                <div className="mt-6 bg-slate-50 border border-slate-200 p-5 md:p-6 rounded-2xl">
                    <h4 className="font-extrabold text-slate-800 flex items-center mb-3 text-sm"><AlertCircle size={16} className="mr-2 text-slate-500"/>残業代の支給要件について</h4>
                    <p className="text-xs text-slate-600 font-medium mb-3">以下のいずれかに該当する場合のみ支給対象となります。</p>
                    <ul className="text-xs text-slate-600 font-medium space-y-1 list-inside list-disc ml-2">
                        <li>授業の延長とそれに伴う定時報告の遅れの場合</li>
                        <li>上長指示による場合</li>
                        <li>ノート作成、質問対応等の延長の場合</li>
                        <li>その他上長が認める場合</li>
                    </ul>
                    <p className="text-xs text-rose-500 font-bold mt-3">※ 定時報告が勤務時間内に書ききれなかった場合の残業代支給はありません。</p>
                </div>
              </div>

              {/* 募集条件 */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center border-b border-teal-50 pb-3">
                    <CheckCircle className="mr-2 text-teal-500" /> 対象者
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-teal-400 shrink-0" /> 
                        <span>学歴/職歴不問</span>
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-teal-400 shrink-0" /> 未経験・無資格可
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-teal-400 shrink-0" /> 18歳以上 (業務委託契約のため)
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center border-b border-teal-50 pb-3">
                    <Sparkles className="mr-2 text-amber-400" /> 歓迎条件
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-amber-500 shrink-0" /> 塾講師としての指導経験
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700">
                        <CheckCircle size={18} className="mr-3 text-amber-500 shrink-0" /> 大学での教養文系科目等の受講経験
                    </li>
                    <li className="flex items-center text-sm font-bold text-slate-700 bg-amber-50 p-2 rounded-lg -ml-2 border border-amber-100">
                        <CheckCircle size={18} className="mr-3 text-amber-500 shrink-0" /> 留学経験・TOEIC 500以上 歓迎
                    </li>
                  </ul>
                </div>
              </div>

              {/* 報酬・契約・勤務時間 (専任) */}
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center border-b-2 border-teal-50 pb-3">
                  <FileText className="mr-3 text-teal-500" /> 報酬・契約・勤務・休日
                </h3>
                
                <div className="bg-white rounded-3xl overflow-hidden border border-teal-100 shadow-sm">
                  <table className="w-full text-left text-sm md:text-base font-medium text-slate-700">
                    <tbody>
                      <tr className="border-b border-teal-50 flex flex-col md:table-row">
                        <th className="w-full md:w-1/3 bg-teal-50/50 p-5 md:p-6 font-extrabold text-slate-800">報酬の仕組み</th>
                        <td className="p-5 md:p-6 space-y-4">
                          <div className="flex justify-between max-w-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-600">基本給（換算時給）：</span>
                            <span className="font-extrabold text-teal-600 text-lg">¥1,226 /h</span>
                          </div>
                          <div className="flex justify-between max-w-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-600">残業手当（x1.25含む）：</span>
                            <span className="font-extrabold text-slate-800">¥1,533 /h</span>
                          </div>
                          <div className="flex justify-between max-w-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-600">研修時給：</span>
                            <span className="font-extrabold text-slate-800">¥1,226 /h</span>
                          </div>
                          <div className="flex justify-between max-w-sm bg-slate-50 p-2 rounded">
                            <span className="text-slate-600">役職手当（部長の場合）：</span>
                            <span className="font-extrabold text-slate-800">¥4,000</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            ※ 基本給は月の規定労働時間によります。<br/>
                            ※ 残業手当は月の規定労働時間を超過した場合にその時間に応じて支給します。
                          </p>
                        </td>
                      </tr>
                      <tr className="border-b border-teal-50 flex flex-col md:table-row">
                        <th className="bg-teal-50/50 p-5 md:p-6 font-extrabold text-slate-800">勤務時間・場所</th>
                        <td className="p-5 md:p-6">
                          <p className="mb-2 text-slate-800">
                            <strong className="font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded mr-1">原則 11:00〜23:00</strong> のうち、<br/>
                            <span className="inline-block mt-1"><strong className="font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">1.5時間〜7時間程度</strong> (出退勤時間は事前申告制)</span>
                          </p>
                          <p className="mb-4 text-slate-800"><strong className="font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">ほぼリモート（在宅勤務）</strong></p>
                          <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                            <li>ノートの補填資料作成等の場合は、あらかじめ上長の許可をとり、作成した資料を定時報告に添付することで証拠書類といたします。</li>
                            <li>深夜手当(x1.25)はありません。</li>
                            <li>了承が得られた方のみ、臨時的に事務所(八王子)への出勤をお願いする場合があります。</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="border-b border-teal-50 flex flex-col md:table-row">
                        <th className="bg-teal-50/50 p-5 md:p-6 font-extrabold text-slate-800">休日</th>
                        <td className="p-5 md:p-6">
                          <ul className="text-sm font-bold text-slate-700 space-y-2">
                            <li>・定例日：特になし</li>
                            <li>・その他：
                                <ol className="list-decimal list-inside ml-4 mt-1 font-medium text-slate-600 text-xs space-y-1">
                                    <li>週当たり２日以上又は４週で４日以上の休日を付与する。</li>
                                    <li>委託者が別途定める事業所の休業日</li>
                                </ol>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="flex flex-col md:table-row">
                        <th className="bg-teal-50/50 p-5 md:p-6 font-extrabold text-slate-800">契約形態</th>
                        <td className="p-5 md:p-6">
                          <p className="mb-3 text-slate-800"><strong className="font-extrabold border-b-2 border-teal-300 pb-0.5">業務委託契約 (フルフレックス風)</strong></p>
                          <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                            <li>労働時間や場所の指定はなく、「１ヶ月の中で一定の時間、勤務してください」という契約書を締結します。実質的にはコアタイム無しのフルフレックスのような形です。</li>
                            <li>出退勤マクロによる自己申告で記録する形式となります。自己申告された時間と勤務内容に大きな相違がある場合、支給できないことがあります。</li>
                            <li>年間報酬が20万円を超えると確定申告が必要です。</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 応募先 CTA --- */}
        <section id="contact" className="py-24 bg-gradient-to-b from-white to-emerald-50 border-t border-emerald-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-6">応募・お問い合わせ</h2>
            <p className="text-slate-600 font-medium mb-12">
              少しでも興味を持っていただけた方は、お気軽に下記までご連絡ください。<br/>
              非常勤・専任ともに、皆様からのご応募を心よりお待ちしております。
            </p>
            
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-emerald-100 shadow-xl max-w-md mx-auto text-left transform hover:-translate-y-1 transition-transform">
              <h3 className="font-extrabold text-emerald-700 mb-8 border-b-2 border-emerald-50 pb-4 text-center">桑都塾 代表室 / 人事部</h3>
              
              <div className="space-y-6">
                <div className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shrink-0 shadow-sm border border-slate-100">
                    <Users size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-0.5">担当者</div>
                    <div className="text-slate-800 font-extrabold">河内 悠眞 <span className="text-xs font-medium text-slate-500 ml-1">Kawachi Yuma</span></div>
                  </div>
                </div>

                <div className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shrink-0 shadow-sm border border-slate-100">
                    <Mail size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-0.5">メールアドレス</div>
                    <a href="mailto:yuma@soutojuku.com" className="text-emerald-600 font-bold hover:text-emerald-500 transition-colors hover:underline">yuma@soutojuku.com</a>
                  </div>
                </div>

                <div className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shrink-0 shadow-sm border border-slate-100">
                    <Phone size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-0.5">電話番号</div>
                    <a href="tel:090-3872-9234" className="text-slate-800 font-extrabold hover:text-emerald-600 transition-colors font-mono">090-3872-9234</a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <a 
                  href="https://lin.ee/tMbkYoY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-4 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#06C755]/30 transform hover:scale-105"
                >
                  <MessageSquare size={20} className="mr-2" />
                  公式LINEから応募する
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}