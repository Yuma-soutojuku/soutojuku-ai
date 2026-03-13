// src/app/api/internal-notices/route.ts
import { NextResponse } from 'next/server';
import { portalClient } from '../../../libs/microcms'; // パスは適宜合わせてください

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await portalClient.getList({
      endpoint: 'internal-notices',
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}