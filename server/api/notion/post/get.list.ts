import { notion } from "../util";
import { getStore } from "@netlify/blobs";

export default defineEventHandler(async (event) => {
  try {
    const store = getStore("notion-post");
    const cached = await store.get("notion-post-list", {
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_API_TOKEN,
    });
    if (cached) {
      return JSON.parse(cached.toString());
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_POST_DB_ID as string,
    });

    const list = response.results;
    await store.set("notion-post-list", JSON.stringify(list));

    return list;
  } catch (error) {
    console.error("Failed to fetch Notion data:", error);
    throw error;
  }
});
