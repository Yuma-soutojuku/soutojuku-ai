import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  console.log('🔔 Webhook triggered!'); // [ログ] Webhookが呼ばれたか
  try {
    // 1. セキュリティチェック
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.WEBHOOK_SECRET) {
      console.log('❌ Secret mismatch. Expected:', process.env.WEBHOOK_SECRET, 'Got:', secret); // [ログ] 合言葉が違った場合
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    console.log('✅ Secret matched.'); // [ログ] 合言葉OK

    // 2. MicroCMSから送られてきたデータを受け取る
    const body = await req.json();
    console.log('📦 Received body:', JSON.stringify(body, null, 2)); // [ログ] MicroCMSから何が送られてきたか全て表示

    // 新しく追加（または更新）されたデータがあるか確認
    if (!body || !body.contents || !body.contents.new) {
      console.log('⏭️ No new contents found in body. Exiting.'); // [ログ] データが見つからなかった場合
      return NextResponse.json({ message: 'No new contents' });
    }

    const notice = body.contents.new;

    // 3. 「特定の講師」宛てかどうかを判定
    const targetTypes = Array.isArray(notice.target_type) ? notice.target_type : [notice.target_type];
    console.log('🎯 Target types:', targetTypes); // [ログ] ターゲットのタイプを表示
    
    // 特定の講師向け、かつメールアドレスが設定されている場合のみ処理
    if (targetTypes.includes('特定の講師') && notice.target_emails) {
      const targetEmails = Array.isArray(notice.target_emails) ? notice.target_emails : [notice.target_emails];
      console.log('✉️ Target emails:', targetEmails); // [ログ] 宛先のメールアドレスを表示
      
      if (targetEmails.length > 0) {
        // 4. メールの送信設定
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // 5. メールの内容
        const mailOptions = {
          from: `"桑都塾 STAFF PORTAL" <${process.env.EMAIL_USER}>`,
          to: targetEmails.join(','),
          subject: `【桑都塾】あなた宛の新しいお知らせがあります`,
          text: `お疲れ様です。
          
桑都塾STAFF PORTALに、あなた宛ての新しいお知らせが追加されました。

【件名】
${notice.title}

以下のURLからポータルにログインして詳細をご確認ください。
▼ 桑都塾 STAFF PORTAL
https://soutojuku.com/portal

※このメールは自動送信システムから送信されています。
`,
        };

        // 6. メール送信実行
        console.log('🚀 Attempting to send email to:', targetEmails.join(',')); // [ログ] 送信試行
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Notice email successfully sent! Message ID:', info.messageId); // [ログ] 送信成功！
      } else {
        console.log('⏭️ Target emails array is empty.');
      }
    } else {
      console.log('⏭️ Not targeting a specific instructor, or no email provided.'); // [ログ] 特定の講師宛てではない場合
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error('❌ Webhook Error:', error); // [ログ] プログラム自体にエラーが起きた場合
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}