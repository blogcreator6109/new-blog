import { notion, getCache, setCache } from "../util";

export default defineEventHandler(async (event) => {
  const key = "notion-post-list";
  try {
    const { category } = await readBody(event);
    setResponseHeaders(event, {
      "Cache-Control": "public, max-age=3600", // 1시간
      "CDN-Cache-Control": "public, max-age=3600",
    });

    const cached = await getCache(key);
    if (cached) {
      return cached;
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_POST_DB_ID as string,
      filter: {
        property: "Category",
        select: {
          equals: category,
        },
      },
    });

    const list = response.results;
    await setCache(key, list);

    return list;
  } catch (error) {
    console.error("Failed to fetch Notion data:", error);
    throw error;
  }
});
