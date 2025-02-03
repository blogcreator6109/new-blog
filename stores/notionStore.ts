import { defineStore } from "pinia";
import type { Category } from "@/composables/useNotion";

export const useNotionStore = defineStore("notion", () => {
  const categories = ref<Category[]>([]);
  const postList = ref<any[]>([]);
  const postContent = ref<any[]>([]);

  // 현재 진행 중인 요청의 컨트롤러
  let controller: AbortController | null = null;

  const fetchCategories = async () => {
    try {
      const response = await $fetch("/api/notion/category", {
        method: "GET",
      });
      categories.value = response.properties.category.select.options.map(
        (option: any) => ({
          id: option.id,
          name: option.name,
        })
      );
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchPostList = async (category?: string) => {
    try {
      // 이전 요청이 있다면 즉시 취소
      controller?.abort();

      // 새로운 컨트롤러 생성
      controller = new AbortController();

      const response = await $fetch("/api/notion/post/list", {
        method: "POST",
        body: { category },
        signal: controller.signal,
      });

      postList.value = response;
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch post list:", error);
      }
    } finally {
      controller = null;
    }
  };

  return {
    categories,
    postList,
    postContent,
    fetchCategories,
    fetchPostList,
  };
});
