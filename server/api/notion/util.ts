import { Client } from "@notionhq/client";
import { getStore } from "@netlify/blobs";
import { H3Event, setResponseHeaders } from "h3";
// 로컬 개발용 메모리 캐시
const memoryCache = new Map();

const DEBUG = true;

export const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const setHeaders = (event: H3Event) => {
  setResponseHeaders(event, {
    "Cache-Control": "public, max-age=3600", // 1시간
    "CDN-Cache-Control": "public, max-age=3600",
  });
};

export const getCache = async (key: string) => {
  if (DEBUG) {
    return null;
  }

  if (process.dev) {
    return memoryCache.get(key) || null;
  }

  // 프로덕션에서는 Netlify Blobs 사용
  const store = getStore(key);
  const cached = await store.get(key);
  return cached ? JSON.parse(cached.toString()) : null;
};

export const setCache = async (
  key: string,
  value: any,
  ttl: number = 7 * 24 * 60 * 60
) => {
  if (DEBUG) return;
  if (process.dev) {
    memoryCache.set(key, value);
    return;
  }

  const store = getStore(key);
  await store.set(key, JSON.stringify(value), {
    metadata: {
      ttl,
    },
  });
};
