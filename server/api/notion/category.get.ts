import { notion, getCache, setCache, setHeaders } from "./util";

export default defineEventHandler(async (event) => {
  try {
    const key = "notion-post:category";

    const cached = await getCache(key);
    if (cached) {
      return cached;
    }

    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_POST_DB_ID as string,
    });

    const list = response;
    await setCache(key, list);

    setHeaders(event);

    return list;
  } catch (error: any) {
    console.error("Failed to fetch Notion data:", error);
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
