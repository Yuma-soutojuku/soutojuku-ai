// src/libs/microcms.ts
import { createClient } from 'microcms-js-sdk';

// 1. 既存の公開用クライアント（トップページ等で使用）
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// 2. 新規のポータル用クライアント（社員ポータルでのみ使用）
export const portalClient = createClient({
  serviceDomain: process.env.PORTAL_MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.PORTAL_MICROCMS_API_KEY || '',
});