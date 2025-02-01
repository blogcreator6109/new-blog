<template>
  <div class="window-list">
    <Window
      v-for="window in windows"
      :key="window.id"
      :id="window.id"
      :component="window.component"
      :dockIndex="window.dockIndex"
    />
  </div>
</template>

<script setup lang="ts">
import Window from "./WindowList/Window.vue";
import { useWindowStore } from "@/stores/windowStore";

const windowStore = useWindowStore();
const windows = computed(() => windowStore.windows);
</script>

<style lang="scss">
.window-list {
  position: relative;
}
</style>
