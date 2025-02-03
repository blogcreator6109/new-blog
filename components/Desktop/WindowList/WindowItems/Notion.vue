<template>
  <div class="notion">
    <div class="notion-sidebar"></div>
    <div class="notion-main">{{ postList }}</div>
  </div>
</template>

<script setup lang="ts">
import { useNotion } from "@/composables/useNotion";

const { getPostList } = useNotion();

const postList = ref([]);

onMounted(async () => {
  postList.value = await getPostList("블로그");
});
</script>
