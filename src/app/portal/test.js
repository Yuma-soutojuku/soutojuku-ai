const { google } = require('googleapis');

// .env から読み込むか、直接文字列を貼り付けてテストしてください
const SERVICE_ACCOUNT_EMAIL = "calendar@calendar-490012.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDup3QMOGxxPRUq\nZlyNW8UTjSV/iVNKmSDRAS4Bjd+cHdaIM1EOS0Bl6ehHaFwgSwzKyh1lcDSiIBrv\nqr86znq/w736Xr1Qbvr/J5KfPxj28PNu9nMkyhW9YLseD3CST0ONXrGVvYAlibR0\nXqla4wpNLx7SFp3vKIbwTL7XmUsqYVlHLK70BPS5KycO3sNcLsqHF4UkzkTGwBFx\nhk+c/Vj+kESbgHu5KKZ9aGhrisJ+Sgn+Zx/5iQcVG7jgQI7nsPob5RBZbgam5zv+\nq+crKlhGk4H72lNjEBYDk35ILMnD70TUlC3HOdFqTJtv4FanWvFlFmBJ+gLYeo3S\nNbUsnOD3AgMBAAECggEADjkg+O4kmbZuvFP/wGr6Oq6RpWFdUJestYLGUlBkGxf0\n0Qbh60yqfghr5VQ/vVWhDGBG/TnWi90G+JwAAUoMqxYdjJON4S0kEgXdPqwSLvwa\n6Ko7yt2tCwLTVA4j2DcXdbrxhtTq6Lx6v+ljsCd81dnGPUtyG9lEpYNQEmWv7aAP\nK2f7Et3mkVqnh0pcESTNSpyf4IeEwfwKa9h8LlkEWEe4UIjN7I/H7j7RxFFmxE1c\nPm3GrWhuuLfvVUTP7O/lw2Gi1lrEwUS3koUf9aK81yYCi/ej3lBkFDnX+jhdWvPW\nx4sQzVtcISZ1nWe1PyjxFtpgsf2ogJxzkCVTXFbrOQKBgQD9G1lAMTBtxetvLc0J\ne8pAjWYdkapk/TvmiomgxA+h9U8iVPlHBrI5o1lkZa1w0v1OlRgctioZ1vr+7nhz\ndVkIj+IQFF99jQxeptTFfeZMcIIrgpXMmqeQnJ39O4rBS+BYOz5q8vZ5lU3Ct0P2\nSMpfMHHBI1vOkPm9UfwXwTrSCQKBgQDxYdADy0EPSOYmioyE8H38HPuDOUxnlMRz\nGCwaApyi+LCM/t71r7JENqH2WSMEuCB8z02bh4Gn8WN6fxU0r6usKY0H+4saj3De\nxQANtnvH/B1Dxgn/Fwr59nWjY8LHHN1FaBFYJCNve0AZXceljwV7xUbZLQo1ZdHh\nNT2A3Vra/wKBgQDnUTJNV2cyO9sCffJQg4EBY/j6dyEqMMGo3d4QPn8m/mG3N7+m\naPlDcgWFmuNbJIj6Y4po2xc5DF/R0zHkG1AmYhExrtziiqDOdFwqrfhmzcA5cZvk\nJUeVA33kbKFQLT84g9R0u94Emi46EXGcSUQioMylveHutFJ58s6ZCzDtuQKBgQCJ\nM2KsNWSmjnYbJBdZHOVPXx3q6a+vFJVRIkU3B5MG4zpe+iO7HIHEWhVXVDUeYpY8\nuwxOwggFcKRtpTxldRCsS/XYurbHgw7R4MH2CWp0Mq5jrnZSI0Pe7qLRG0xEJvjy\nkYOCSRBHNpQplu97AD9KqchqezpZPaW9T6jEzYzt+wKBgQDdF6R7q8Xn2C2uE/HQ\no/L1dbOCaq2LMb8GlVKRPRAZjr9JNRljxehxTy3Z0cc2Q88p0NNZupoPo7Ryau6h\nOMCW2Rn6Eypi8QPPyLb5za+oMTXiiio+GUuK9Sx1C2Vrj5RUgfaK274ZoIveyTbh\nUqopH2HJIqU3MqCm90mbSXPLLg==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n');

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth });

async function test() {
  try {
    console.log('認証試行中...');
    const res = await calendar.events.list({
      calendarId: '4d5f097f50a5acdaebb19d7d37f91e3dadd227da259c00296c75421a4320453b@group.calendar.google.com',
      timeMin: new Date().toISOString(),
      singleEvents: true,
      maxResults: 5,
    });
    console.log('成功！予定一覧:');
    res.data.items.forEach(event => {
      console.log(`- ${event.summary} (${event.start.dateTime || event.start.date})`);
    });
  } catch (err) {
    console.error('エラー詳細:');
    if (err.response) {
      // Google APIからの具体的なエラーレスポンスを表示
      console.error(JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err.message);
    }
  }
}

test();