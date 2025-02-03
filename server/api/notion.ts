export const getNotionPage = async (pageId: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_POST_DB_ID,
  });
  return response.results;
};
