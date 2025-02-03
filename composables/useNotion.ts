export const useNotion = () => {
  const getPostList = async (category: string) => {
    const response = await $fetch("/api/notion/post/post.list", {
      method: "POST",
      body: {
        category,
      },
    });
    console.log("response", response);
    return response;
  };

  return {
    getPostList,
  };
};
