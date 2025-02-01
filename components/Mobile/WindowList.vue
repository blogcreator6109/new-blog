<template>
  <div class="window-list">
    <Window v-for="window in windows" :key="window.id"></Window>
  </div>
</template>

<script setup lang="ts">
import Window from "./WindowList/Window.vue";
import { useWindowStore } from "@/stores/windowStore";

const windowStore = useWindowStore();
const windows = computed(() => windowStore.windows);
</script>

<style lang="scss"></style>
