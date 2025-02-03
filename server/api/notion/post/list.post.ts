import { notion, getCache, setCache, setHeaders } from "../util";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { category } = body;
    const key = `notion-post-list:${category || "all"}`;

    const cached = await getCache(key);
    if (cached) {
      return cached;
    }

    const filter = category
      ? {
          property: "category",
          select: {
            equals: category,
          },
        }
      : undefined;

    const sorts = [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ];

    const response = await getAllDatabaseEntries(
      process.env.NOTION_POST_DB_ID as string,
      filter,
      sorts
    );

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

async function getAllDatabaseEntries(
  databaseId: string,
  filter: any,
  sorts: any[]
) {
  let results: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      page_size: 100,
      filter,
      sorts,
    });

    results = [...results, ...response.results];
    hasMore = response.has_more;
    startCursor = response.next_cursor || undefined;
  }

  return results;
}
