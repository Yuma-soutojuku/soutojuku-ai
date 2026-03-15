import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // 1. セキュリティチェック (適当な合言葉を設定)
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2. MicroCMSから送られてきたデータを受け取る
    const body = await req.json();

    // 新しく追加（または更新）されたデータがあるか確認
    if (!body || !body.contents || !body.contents.new) {
      return NextResponse.json({ message: 'No new contents' });
    }

    const notice = body.contents.new;

    // 3. 「特定の講師」宛てかどうかを判定
    const targetTypes = Array.isArray(notice.target_type) ? notice.target_type : [notice.target_type];
    
    // 特定の講師向け、かつメールアドレスが設定されている場合のみ処理
    if (targetTypes.includes('特定の講師') && notice.target_emails) {
      const targetEmails = Array.isArray(notice.target_emails) ? notice.target_emails : [notice.target_emails];
      
      if (targetEmails.length > 0) {
        // 4. メールの送信設定
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER, // Step1のアカウントアドレス
            pass: process.env.EMAIL_PASS, // Step1の16桁のアプリパスワード
          },
        });

        // 5. メールの内容
        const mailOptions = {
          from: `"桑都塾 STAFF PORTAL" <${process.env.EMAIL_USER}>`,
          to: targetEmails.join(','), // 複数の場合は宛先を繋げる
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
        await transporter.sendMail(mailOptions);
        console.log('Notice email successfully sent to:', targetEmails);
      }
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}