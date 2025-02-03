import { Client } from "@notionhq/client";
import { getStore } from "@netlify/blobs";

// 로컬 개발용 메모리 캐시
const memoryCache = new Map();

export const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const getCache = async (key: string) => {
  if (process.dev) {
    return memoryCache.get(key) || null;
  }

  // 프로덕션에서는 Netlify Blobs 사용
  const store = getStore(key);
  const cached = await store.get(key);
  return cached ? JSON.parse(cached.toString()) : null;
};

export const setCache = async (key: string, value: any) => {
  if (process.dev) {
    memoryCache.set(key, value);
    return;
  }

  const store = getStore(key);
  await store.set(key, JSON.stringify(value));
};
