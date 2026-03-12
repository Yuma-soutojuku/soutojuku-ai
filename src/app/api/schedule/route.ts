import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  // 1. セッション取得
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // API Route内でのセット失敗は無視してOK
          }
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    // ターミナルにエラー内容を出す
    console.log("--- Auth Debug ---");
    console.log("Error:", authError?.message);
    console.log("User:", user);
    console.log("Cookies:", (await cookies()).getAll().length);
    return NextResponse.json({ error: 'Unauthorized', detail: authError?.message }, { status: 401 });
  }

  const lecturerEmail = user.email;

  try {
    // 2. Google Auth 設定 (test.js で成功した設定)
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    
    // --- 【ここが修正ポイント：範囲を今日のみに限定】 ---
    const now = new Date();
    
    // 今日の 00:00:00 (JST)
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    // 明日の 23:59:59 (JST) に書き換え
    const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59);

    const res = await calendar.events.list({
      calendarId: '4d5f097f50a5acdaebb19d7d37f91e3dadd227da259c00296c75421a4320453b@group.calendar.google.com',
      timeMin: startOfDay.toISOString(), 
      timeMax: endOfTomorrow.toISOString(), // 明日の夜まで取得
      singleEvents: true,
      orderBy: 'startTime',
      q: lecturerEmail,
    });
    // --------------------------------------------------

    const STUDENT_MAP: Record<string, string> = {
      'shinmikyuuta@gmail.com': '新美', //ここから生徒
      'kfukumotto@gmail.com': '福本',
      'x2353016@gmail.com': '松尾',
      'soutojuku.rental.1@gmail.com': '小澤',
      'ryo.soyano@gmail.com': '征矢野',
      'shengpingzuomu60@gmail.com': '佐々木',
      'shiho.snd223@gmail.com': '篠田',
      'harubex8@gmail.com': '阿部ちはる',
      'youshouldmarry@gmail.com': '郡',
      'anpanman571231@gmail.com': '森田全',
      '19810108naomi@gmail.com': '',
      'ai.soyano@gmail.com': '',
      'hiyokechita@gmail.com': '中元',
      'aubekiko@gmail.com': '阿部晃己',
      'momogin6@outlook.com': '重信',
      'regisford41023@icloud.com': '',
      'ttnis10mo3@gmail.com': '',
      'saitoamy2783@gmail.com': '瑛美',
      'watasihanina@gmail.com': '仁南',
      'ilovekorea0628@gmail.com': '松岡',
      'nontan0723nontan@gmail.com': '姫野',
      'jialaichuanyoujing@gmail.com': '加瀬川',
      'lrway300@outlook.jp': '中山'
      // ここにどんどん追加してください
    };
    // 4. 整形ロジック
    const events = res.data.items?.filter(event => 
      event.attendees?.some(a => a.email === lecturerEmail)
    ).map(event => {
      
      const studentNames = event.attendees
        ?.filter(a => !a.email?.endsWith('@soutojuku.com')) // 塾ドメイン除外
        .map(a => {
          const email = a.email?.toLowerCase() || ''; // 小文字に統一して判定
          
          // STUDENT_MAPに登録がある場合のみ、その値を返す
          if (Object.prototype.hasOwnProperty.call(STUDENT_MAP, email)) {
            return STUDENT_MAP[email];
          }
          
          // マップにない場合は null を返して後で消す
          // (メールアドレスを表示させたくない場合はここを null にする)
          return null; 
        })
        // null、undefined、空文字をすべて排除
        .filter((name): name is string => !!name) || [];

      return {
        id: event.id,
        subject: event.summary,
        start: event.start?.dateTime || event.start?.date,
        meetLink: event.hangoutLink,
        students: studentNames
      };
    });

    return NextResponse.json(events);
  } catch (err: any) {
    console.error('Google API Error:', err);
    return NextResponse.json({ error: 'Google API Error' }, { status: 500 });
  }
}