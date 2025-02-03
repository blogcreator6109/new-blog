export const useNotion = () => {
  const getPostList = async () => {
    const response = await $fetch("/api/notion/post/get.list");
    return response;
  };

  return {
    getPostList,
  };
};
