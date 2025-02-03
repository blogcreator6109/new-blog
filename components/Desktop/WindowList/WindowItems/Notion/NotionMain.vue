<template>
  <div class="notion-main">
    <div v-for="post in postListRef" :key="post.id">
      <div class="notion-main__title">
        {{ post.properties.title.title[0].plain_text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useNotionStore } from "@/stores/notionStore";

const store = useNotionStore();
const { postList } = storeToRefs(store);

const postListRef = toRef(postList);

store.fetchPostList();
</script>

<style lang="scss">
.notion-main {
  flex: 1;
  background-color: var(--window-bg-100);
  overflow: hidden auto;
  padding: 2rem 2.5rem;
}
</style>
