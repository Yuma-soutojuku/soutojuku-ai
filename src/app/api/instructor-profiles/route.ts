// 例: src/app/api/instructor-profiles/route.ts
import { NextResponse } from 'next/server';
import { portalClient } from '../../../libs/microcms'; // クライアントのパスは適宜変更してください

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await portalClient.getList({
      endpoint: 'instructor-profiles', // MicroCMSのエンドポイント名
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API Route:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}