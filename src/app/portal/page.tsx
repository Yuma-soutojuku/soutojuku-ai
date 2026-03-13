'use client';

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { 
  Lock, User, LogIn, Bell, Calendar as CalendarIcon, 
  FileText, Link as LinkIcon, 
  LogOut, Clock, Video, Wallet, ChevronRight, AlertCircle, CheckCircle2, X, Loader2, CheckCircle, Send
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MOCK_SCHEDULE = [
  { id: 1, time: '17:00 - 18:30', student: '田中 健太 (中2)', subject: '数学 (一次関数)', link: 'https://meet.google.com/xxx-xxxx-xxx', status: 'upcoming' },
  { id: 2, time: '19:00 - 20:30', student: '佐藤 美咲 (高専3)', subject: '物理 (力学)', link: 'https://meet.google.com/yyy-yyyy-yyy', status: 'upcoming' },
];

const MOCK_LINKS = [
  { title: 'Google Meet', url: 'https://meet.google.com/', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg' },
  { title: 'Google Mail', url: 'https://mail.google.com/mail/u/0/?ogbl#inbox', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg' },
  { title: 'Google Chat', url: 'https://chat.google.com/u/0/app/home', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Google_Chat_icon_%282023%29.svg' },
  { title: '公式LINE 管理画面', url: 'https://manager.line.biz/', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg' },
  { title: 'TT (時間割・シフト)', url: 'https://docs.google.com/spreadsheets/d/15v5vNHXdK_BguDwUJFKhqm0LEFTFOgsbruCbRvY_rj4/edit?usp=sharing', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg' },
  { title: '授業マクロ', url: 'https://docs.google.com/spreadsheets/d/1saZdLbZ_JT0r7MUGL-jte7eBeJj0L6ctFWRhUHfmzDM/edit?gid=1203043952#gid=1203043952', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg' },
];

// ★ メールアドレスからスプレッドシート用シート名（苗字）へ変換するマッピング
const getFamilyNameFromEmail = (email: string | null | undefined): string => {
  if (!email) return '未登録';
  
  const emailMap: { [key: string]: string } = {
    'yuma@soutojuku.com': '河内',
    'takagi@soutojuku.com': '髙木',
    'okazaki@soutojuku.com': '岡崎',
    'nishijima@soutojuku.com': '西嶋',
    'ito@soutojuku.com': '伊藤',
    'sano@soutojuku.com': '佐野',
    'hagiwara@soutojuku.com': '萩原',
    'fujino@soutojuku.com': '藤野'
  };

  return emailMap[email.toLowerCase()] || '未登録';
};

// ★ 勤続期間を計算する関数
const calculateDuration = (hiredDateString: string | null | undefined) => {
  if (!hiredDateString) return '未登録';
  
  const hiredDate = new Date(hiredDateString);
  if (isNaN(hiredDate.getTime())) return '未登録';

  const now = new Date();
  let years = now.getFullYear() - hiredDate.getFullYear();
  let months = now.getMonth() - hiredDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (years === 0 && months === 0) return '1ヶ月未満';
  
  let result = '';
  if (years > 0) result += `${years}年`;
  if (months > 0) result += `${months}ヶ月`;
  
  return result;
};

const NoticeModal = ({ notice, onClose }: { notice: any, onClose: () => void }) => {
  if (!notice) return null;

  const isPersonal = Array.isArray(notice.target_type) 
    ? notice.target_type.includes('特定の講師') 
    : notice.target_type === '特定の講師';
    
  const displayDate = notice.publishedAt 
    ? new Date(notice.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }) 
    : notice.date;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start p-5 sm:p-6 border-b border-slate-100">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                {displayDate}
              </span>
              {notice.type === 'important' && (
                <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-sm">重要</span>
              )}
              {isPersonal && (
                <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-sm border border-blue-200">あなた宛</span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">{notice.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors shrink-0">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
           <div 
              className="prose prose-sm sm:prose-base max-w-none text-slate-700
                         prose-a:text-blue-500 prose-a:underline hover:prose-a:text-blue-600
                         prose-strong:text-slate-900 prose-strong:font-bold
                         prose-headings:text-slate-800 prose-headings:font-bold
                         prose-ul:list-disc prose-ol:list-decimal"
              dangerouslySetInnerHTML={{ __html: notice.content || '<p>本文がありません。</p>' }} 
           />
        </div>
        
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EmployeePortal() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // ★ 初期ロード状態（認証）
  const [loading, setLoading] = useState(true);
  
  // 各データの状態管理
  const [notices, setNotices] = useState<any[]>([]);
  const [noticesLoading, setNoticesLoading] = useState(false);
  
  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [totalReward, setTotalReward] = useState<number>(0);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const [debugRawData, setDebugRawData] = useState<any>(null);

  const [profile, setProfile] = useState<any>({
    role: '未登録',
    type: '未登録',
    department: '未登録',
    hiredDate: null 
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // データ取得を別関数として切り出し、並列に実行しやすくする
  const fetchData = async (user: any) => {
    // ローディング状態をオン
    setNoticesLoading(true);
    setProfileLoading(true);
    setAttendanceLoading(true);
    setIsLoading(true);

    // 1. お知らせの取得
    fetch('/api/internal-notices')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch notices');
        return res.json();
      })
      .then(cmsData => {
        if(cmsData && cmsData.contents) {
          const filtered = cmsData.contents.filter((notice: any) => {
            const targetTypes = Array.isArray(notice.target_type) ? notice.target_type : [notice.target_type];
            if (!notice.target_type || targetTypes.includes('全員')) return true;
            if (targetTypes.includes('特定の講師') && notice.target_emails) {
              const targetEmails = Array.isArray(notice.target_emails) ? notice.target_emails : [notice.target_emails]; 
              if (targetEmails.includes(user.email)) return true;
            }
            return false;
          });
          setNotices(filtered);
        }
      })
      .catch(e => {
        console.error('Error fetching notices:', e);
        setNotices([]);
      })
      .finally(() => setNoticesLoading(false));

    // 2. プロフィール情報の取得
    fetch('/api/instructor-profiles')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(profileData => {
        if(profileData && profileData.contents) {
          const myProfile = profileData.contents.find((p: any) => p.email === user.email);
          if (myProfile) {
            setProfile({
              role: myProfile.role || '未登録',
              type: myProfile.type || '未登録',
              department: myProfile.department || '未登録',
              hiredDate: myProfile.hiredDate || myProfile.hiredAt || null 
            });
          }
        }
      })
      .catch(e => console.error('Error fetching profile:', e))
      .finally(() => setProfileLoading(false));

    // 3. 勤怠データ(スプレッドシート)の取得
    setAttendanceError(null);
    const sheetNameFamily = getFamilyNameFromEmail(user.email);
    fetch(`/api/attendance?name=${encodeURIComponent(sheetNameFamily)}`)
      .then(res => res.json())
      .then(attData => {
        setDebugRawData(attData);
        if (attData.error) {
           setAttendanceError(`取得失敗: ${attData.error} / 詳細: ${attData.details || 'なし'}`);
        } else {
           setAttendanceRecords(attData.records || []);
           setTotalReward(attData.totalAmount || 0);
           if (!attData.records || attData.records.length === 0) {
              setAttendanceError(`シート「${attData.sheetName || sheetNameFamily}」にデータが見つかりませんでした。`);
           }
        }
      })
      .catch(e => {
        console.error('Error fetching attendance:', e);
        setAttendanceError(`通信エラー: ${e.message}`);
      })
      .finally(() => setAttendanceLoading(false));

    // 4. カレンダー取得
    fetch('/api/schedule', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLessons(data);
        else setLessons([]);
      })
      .catch(e => {
        console.error('Error fetching schedule:', e);
        setLessons([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // コンポーネントマウント時にユーザー情報を取得
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.warn("Auth error detected, clearing session:", error.message);
          // エラー（無効なトークンなど）の場合はセッションをクリア
          await supabase.auth.signOut();
          setSession(null);
        } else if (user) {
          setSession({ user });
          fetchData(user); // データ取得開始
        } else {
          setSession(null);
        }
      } catch (err) {
        console.error("Unexpected error during auth check:", err);
        setSession(null);
      } finally {
        // ★重要：成功・失敗に関わらず、チェックが終わったら必ずローディングを解除する
        setLoading(false);
      }
    };

    checkUser();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession?.user) {
        setSession(currentSession);
        fetchData(currentSession.user);
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
          if (error.message.includes('Invalid login credentials')) {
              setError('メールアドレスまたはパスワードが間違っています。');
          } else {
              setError(error.message); 
          }
      }
      // 成功した場合は onAuthStateChange が発火して処理を引き継ぐ
    } catch(err) {
       console.error("Login Error:", err);
       setError('ログイン中に予期せぬエラーが発生しました。');
    } finally {
       setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setNotices([]);
    setAttendanceRecords([]);
    setTotalReward(0);
    setAttendanceError(null);
    setDebugRawData(null);
    setLessons([]);
    setProfile({
        role: '未登録',
        type: '未登録',
        department: '未登録',
        hiredDate: null
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '--:--';
    return new Intl.DateTimeFormat('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(dateString));
  };

  // lessons配列を「今日」と「明日」に振り分けるロジック
  const now = new Date();
  // Vercel(UTC)でのズレを防ぐため、強制的に日本時間での「今日」の文字列を作る
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const todayYear = jstNow.getUTCFullYear();
  const todayMonth = String(jstNow.getUTCMonth() + 1).padStart(2, '0');
  const todayDay = String(jstNow.getUTCDate()).padStart(2, '0');
  const todayStr = `${todayYear}/${todayMonth}/${todayDay}`; // 例: 2026/03/13
  
  const jstTomorrow = new Date(jstNow.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowYear = jstTomorrow.getUTCFullYear();
  const tomorrowMonth = String(jstTomorrow.getUTCMonth() + 1).padStart(2, '0');
  const tomorrowDay = String(jstTomorrow.getUTCDate()).padStart(2, '0');
  const tomorrowStr = `${tomorrowYear}/${tomorrowMonth}/${tomorrowDay}`;

  const todayLessons = lessons.filter(l => {
    if (!l.start) return false;
    // APIから返ってきた日付 (例: 2026-03-13T17:00:00+09:00) をDateオブジェクトにし、JST文字列にする
    const lDate = new Date(l.start);
    const y = lDate.getFullYear();
    const m = String(lDate.getMonth() + 1).padStart(2, '0');
    const d = String(lDate.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}` === todayStr;
  });

  const tomorrowLessons = lessons.filter(l => {
    if (!l.start) return false;
    const lDate = new Date(l.start);
    const y = lDate.getFullYear();
    const m = String(lDate.getMonth() + 1).padStart(2, '0');
    const d = String(lDate.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}` === tomorrowStr;
  });

  if (loading) return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-slate-400 mb-4" size={48} />
      <p className="text-slate-500 font-bold">読み込み中...</p>
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">社員ポータル</h1>
            <p className="text-slate-500 text-sm mt-2">桑都塾 スタッフ専用ページ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium flex items-center border border-red-100">
                <AlertCircle size={16} className="mr-2 shrink-0" />
                {error}
              </div>
            )}
            
           <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">メールアドレス</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-500" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="name@soutojuku.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">パスワード</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white font-bold rounded-xl transition-all shadow-md"
            >
              {loading ? "認証中..." : <><LogIn size={18} className="mr-2" /> ログイン</>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Lock size={18} className="text-blue-400" />
            </div>
            <span className="font-bold text-lg tracking-wide">Soutojuku STAFF PORTAL</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-300">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <User size={16} />
              </div>
              {session.user.email} 
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-sm font-bold text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-3 py-1.5 rounded-lg"
            >
              <LogOut size={16} className="mr-1.5" />
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800">お疲れ様です！</h1>
          <p className="text-slate-500 font-medium mt-1">本日の業務連絡と予定を確認してください。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex flex-col">
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800 flex items-center">
                      <CalendarIcon size={18} className="mr-2 text-blue-500" />
                      本日の授業予定
                  </h2>
                  {!isLoading && (
                      <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {todayLessons.length}件
                      </span>
                  )}
              </div>
              <div className="p-4 sm:p-6 space-y-4 flex-1">
                  {isLoading ? (
                      <div className="flex justify-center py-8"><Loader2 className="animate-spin text-slate-300" /></div>
                  ) : todayLessons.length === 0 ? (
                      <div className="text-center py-10 text-slate-400 text-sm">本日の予定はありません</div>
                  ) : (
                      todayLessons.map((lesson) => (
                        <div
                        key={lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group"
                        >
                        <div className="mb-4 sm:mb-0">
                            <div className="flex items-center text-blue-600 font-bold mb-1">
                            <Clock size={16} className="mr-1.5" />
                            {formatTime(lesson.start)} 〜
                            </div>
                            <div className="font-extrabold text-slate-800 text-lg mb-1">
                            {lesson.students && lesson.students.length > 0 ? lesson.students.join(', ') : '生徒名なし'}
                            </div>
                            <div className="text-sm font-medium text-slate-500">{lesson.subject || '科目指定なし'}</div>
                        </div>

                        <div className="flex sm:flex-col gap-2">
                            {lesson.meetLink ? (
                            <a
                                href={lesson.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            >
                                <Video size={16} className="mr-2" />
                                Meetを開く
                            </a>
                            ) : (
                            <button disabled className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-400 text-sm font-bold rounded-lg cursor-not-allowed">
                                <Video size={16} className="mr-2" />
                                URLなし
                            </button>
                            )}
                        </div>
                        </div>
                    ))
                  )}
              </div>
              {/* ▼ 今日の定時報告ボタンを追加 ▼ */}
              <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex justify-end">
                {todayLessons.length > 0 ? (
                  <a 
                    href="https://docs.google.com/spreadsheets/d/1saZdLbZ_JT0r7MUGL-jte7eBeJj0L6ctFWRhUHfmzDM/edit?gid=1203043952#gid=1203043952&range=B2" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                  >
                    <Send size={18} className="mr-2" />
                    今日の定時報告を送る
                  </a>
                ) : (
                  <button disabled className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-400 text-sm font-bold rounded-xl cursor-not-allowed">
                    <Send size={18} className="mr-2" />
                    今日の定時報告を送る
                  </button>
                )}
              </div>
            </section>

            {/* --- 明日の授業予定 --- */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50/50 border-b border-slate-200 p-4 flex items-center justify-between">
                    <h2 className="font-bold text-slate-500 flex items-center">
                        <CalendarIcon size={18} className="mr-2 text-slate-400" />
                        明日の授業予定
                    </h2>
                    {!isLoading && (
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                            {tomorrowLessons.length}件
                        </span>
                    )}
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                    {isLoading ? null : tomorrowLessons.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm">明日の予定はありません</div>
                    ) : (
                        tomorrowLessons.map((lesson) => (
                          <div key={lesson.id} className="opacity-70 grayscale-[0.3] hover:grayscale-0 hover:opacity-100 transition-all">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                              <div className="mb-4 sm:mb-0">
                                <div className="flex items-center text-blue-600 font-bold mb-1">
                                <Clock size={16} className="mr-1.5" />
                                {formatTime(lesson.start)} 〜
                                </div>
                                <div className="font-extrabold text-slate-800 text-lg mb-1">
                                {lesson.students && lesson.students.length > 0 ? lesson.students.join(', ') : '生徒名なし'}
                                </div>
                                <div className="text-sm font-medium text-slate-500">{lesson.subject || '科目指定なし'}</div>
                              </div>

                              <div className="flex sm:flex-col gap-2">
                                  {lesson.meetLink ? (
                                  <a
                                      href={lesson.meetLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                                  >
                                      <Video size={16} className="mr-2" />
                                      Meetを開く
                                  </a>
                                  ) : (
                                  <button disabled className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-400 text-sm font-bold rounded-lg cursor-not-allowed">
                                      <Video size={16} className="mr-2" />
                                      URLなし
                                  </button>
                                  )}
                              </div>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </section>
          </div>

          <div className="space-y-6">
            
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800 flex items-center">
                    <Bell size={18} className="mr-2 text-amber-500" />
                    社内お知らせ
                    </h2>
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800">すべて見る</button>
                </div>
                <div className="p-0">
                    <ul className="divide-y divide-slate-100">
                    {noticesLoading ? (
                        <li className="p-6 text-center text-sm text-slate-400">読み込み中...</li>
                    ) : notices.length > 0 ? (
                        notices.map((notice: any) => {
                        const isPersonal = Array.isArray(notice.target_type) 
                            ? notice.target_type.includes('特定の講師') 
                            : notice.target_type === '特定の講師';
                        
                        return (
                            <li key={notice.id} className="p-4 hover:bg-slate-50 transition-colors">
                            <button onClick={() => setSelectedNotice(notice)} className="w-full text-left block group">
                                <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-slate-400">
                                    {new Date(notice.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}
                                </span>
                                {notice.type === 'important' && (
                                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-sm border border-red-200 ml-2">重要</span>
                                )}
                                {isPersonal && (
                                    <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-sm border border-blue-200 ml-2">
                                    あなた宛
                                    </span>
                                )}
                                </div>
                                <h3 className="text-sm font-bold text-slate-700 group-hover:text-blue-600 line-clamp-2 leading-snug mt-1">
                                {notice.title}
                                </h3>
                            </button>
                            </li>
                        );
                        })
                    ) : (
                        <li className="p-6 text-center text-sm text-slate-500">
                        現在、新しいお知らせはありません。
                        </li>
                    )}
                    </ul>
                </div>
            </section>

            {/* ▼ 「よく使う業務リンク」を右カラムに移動 ▼ */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 p-4">
                    <h2 className="font-bold text-slate-800 flex items-center">
                    <LinkIcon size={18} className="mr-2 text-purple-500" />
                    よく使う業務リンク
                    </h2>
                </div>
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-4">
                    {MOCK_LINKS.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all group shadow-sm">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <img src={link.iconUrl} alt={link.title} className="w-6 h-6 object-contain" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">{link.title}</span>
                        </a>
                    ))}
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 p-4">
                    <h2 className="font-bold text-slate-800 flex items-center">
                    <User size={18} className="mr-2 text-blue-500" />
                    契約・基本情報
                    </h2>
                </div>
                <div className="p-4 sm:p-6 grid grid-cols-2 gap-4">
                    {profileLoading ? (
                        <div className="col-span-2 text-center text-sm text-slate-400 py-4">読み込み中...</div>
                    ) : (
                        <>
                            <div>
                            <p className="text-xs text-slate-400 font-medium mb-1">契約形態</p>
                            <p className="text-sm font-bold text-slate-700">{profile.type}</p>
                            </div>
                            <div>
                            <p className="text-xs text-slate-400 font-medium mb-1">役職</p>
                            <p className="text-sm font-bold text-slate-700">{profile.role}</p>
                            </div>
                            <div>
                            <p className="text-xs text-slate-400 font-medium mb-1">所属</p>
                            <p className="text-sm font-bold text-slate-700">{profile.department}</p>
                            </div>
                            <div>
                            <p className="text-xs text-slate-400 font-medium mb-1">勤続期間</p>
                            <p className="text-sm font-bold text-slate-700">
                                {calculateDuration(profile.hiredDate)}
                            </p>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-sm border border-slate-700 overflow-hidden text-white">
                <div className="border-b border-slate-700/50 p-4 flex justify-between items-center">
                    <h2 className="font-bold flex items-center">
                    <Wallet size={18} className="mr-2 text-emerald-400" />
                    今月の見込み報酬
                    </h2>
                    <span className="text-xs font-mono text-slate-400">{new Date().getMonth() + 1}月度</span>
                </div>
                
                <div className="p-6 border-b border-slate-700/50">
                    <div className="text-4xl font-extrabold flex items-baseline">
                    <span className="text-2xl mr-1">¥</span>
                    {attendanceLoading ? (
                        <span className="animate-pulse">---</span>
                    ) : (
                        totalReward.toLocaleString()
                    )}
                    <span className="text-sm font-medium text-slate-400 ml-2">※暫定</span>
                    </div>
                    
                    {attendanceError && (
                        <div className="mt-4 bg-red-900/50 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg flex items-start">
                        <AlertCircle size={14} className="mr-2 shrink-0 mt-0.5 text-red-400" />
                        <span>{attendanceError}</span>
                        </div>
                    )}
                </div>
                
                <div className="bg-slate-800/50 p-4">
                    <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center">
                    <Clock size={14} className="mr-1" />
                    勤怠明細 (確定分)
                    </h3>
                    <div className="space-y-2">
                    {attendanceLoading ? (
                        <div className="text-center text-sm text-slate-500 py-4 animate-pulse">読み込み中...</div>
                    ) : attendanceRecords.length > 0 ? (
                        attendanceRecords.map(record => (
                        <div key={record.id} className="flex items-center justify-between text-sm bg-slate-800 p-3 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-3">
                            <div className="w-10 text-center text-slate-300 font-mono text-xs">{record.date}</div>
                            <div>
                                <div className="font-bold text-slate-200 flex items-center gap-2">
                                {record.type}
                                <span className="text-[10px] font-normal text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
                                    {record.minutes}分
                                </span>
                                </div>
                                <div className="text-xs text-slate-400 font-mono mt-0.5">
                                {record.start} - {record.end} (@{record.wage})
                                </div>
                                {record.allowance > 0 && (
                                    <div className="text-[10px] text-amber-400 mt-0.5">
                                        手当: +¥{record.allowance.toLocaleString()}
                                    </div>
                                )}
                            </div>
                            </div>
                            <div className="font-bold text-emerald-400 font-mono text-right">
                                <div className="text-xs text-slate-500 font-normal">報酬</div>
                                +¥{record.amount.toLocaleString()}
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="text-center text-sm text-slate-500 py-4">今月の勤怠データはまだありません。</div>
                    )}
                    </div>
                </div>

                <div className="p-4 bg-slate-900/50">
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-bold">
                    <span>過去の給与明細を見る(未実装)</span>
                    <ChevronRight size={16} className="text-slate-400" />
                    </button>
                </div>
            </section>

          </div>
        </div>
      </main>
      <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
    </div>
  );
}