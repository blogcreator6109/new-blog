<template>
  <div class="window-notion">
    <NotionSidebar />
    <NotionMain />
  </div>
</template>

<script setup lang="ts">
import NotionSidebar from "./Notion/NotionSidebar.vue";
import NotionMain from "./Notion/NotionMain.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/scss/base/variables.scss" as *;

.window-notion {
  display: flex;
  height: 100%;
}
</style>
