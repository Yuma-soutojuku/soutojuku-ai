import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('name') || '西嶋';
  
  const now = new Date();
  const monthStr = String(now.getMonth() + 1).padStart(2, '0') + '月';
  
  // 例: [西嶋]03月
  const sheetName = `[${userName}]${monthStr}`;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // B列〜L列を取得 (B:日付, C:業務, D:開始, E:終了, F:分, G:時給, I:報酬, J:手当, L:合計)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `'${sheetName}'!B:L`, 
    });

    const rows = response.data.values;
    
    if (!rows || rows.length < 2) {
      return NextResponse.json({ records: [], totalAmount: 0, sheetName, rawRows: "データが少ないか見つかりません" });
    }

    const records = [];
    
    // L2セル(インデックスでは row[1][10] )から当該月の報酬を取得
    // ※B列がインデックス0なので、L列はインデックス10になります (B,C,D,E,F,G,H,I,J,K,L -> 0,1,2,3,4,5,6,7,8,9,10)
    let totalAmount = 0;
    if (rows[1] && rows[1][10]) {
       const totalStr = String(rows[1][10]).replace(/[¥,]/g, '').trim();
       totalAmount = parseInt(totalStr, 10) || 0;
    }

    // データは3行目（インデックス2）から始まる
    for (let i = 2; i < rows.length; i++) {
      const row = rows[i];
      // B列(インデックス0)が日付
      const dateStr = row[0] || '';
      
      // 日付に「月」が含まれていれば有効な行とみなす
      if (dateStr.includes('月')) {
        // I列(インデックス7)が報酬
        const amountStr = row[7] ? String(row[7]).replace(/[¥,]/g, '').trim() : '0';
        const amount = parseInt(amountStr, 10) || 0;

        // J列(インデックス8)がその他手当
        const allowanceStr = row[8] ? String(row[8]).replace(/[¥,]/g, '').trim() : '0';
        const allowance = parseInt(allowanceStr, 10) || 0;

        records.push({
          id: i,
          date: dateStr.replace('月', '/').replace('日', ''), // "3月2日" -> "3/2"
          type: row[1] || '',      // C列: 業務
          start: row[2] || '',     // D列: 開始
          end: row[3] || '',       // E列: 終了
          minutes: row[4] || '0',  // F列: 分
          wage: row[5] || '0',     // G列: 時給
          amount: amount,          // I列: 報酬
          allowance: allowance     // J列: その他手当
        });
      }
    }

    return NextResponse.json({ 
      records, 
      totalAmount, 
      sheetName,
      rawRows: rows // デバッグ用
    });

  } catch (error: any) {
    console.error('Sheets API Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch spreadsheet', details: error.message, sheetName }, 
      { status: 500 }
    );
  }
}