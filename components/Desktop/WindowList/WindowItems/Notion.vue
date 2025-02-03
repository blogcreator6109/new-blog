<template>
  <div class="notion">
    <div class="notion-sidebar"></div>
    <div class="notion-main"></div>
  </div>
</template>

<script setup lang="ts">
import { useNotion } from "@/composables/useNotion";

const { getPostList } = useNotion();

onMounted(async () => {
  const postList = await getPostList();
  console.log(postList);
});
</script>
