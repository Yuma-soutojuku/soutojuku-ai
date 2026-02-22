import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'soutojuku', // あなたのサービスID
  apiKey: process.env.MICROCMS_API_KEY || '',
});
