import { notion, getCache, setCache, setHeaders } from "../util";
import { collectPaginatedAPI } from "@notionhq/client";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { pageId } = body;
    const key = "notion-post-content" + (pageId ? `:${pageId}` : "");

    const cached = await getCache(key);
    if (cached) {
      return cached;
    }

    const content = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: pageId,
    });

    await setCache(key, content, 60 * 60);

    setHeaders(event);

    return content;
  } catch (error: any) {
    console.error("Failed to fetch Notion data:", error);
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
