<template>
  <div class="app-icon-list">
    <button
      v-for="(app, i) in appList"
      :key="app.name"
      class="app-icon-item"
      @click="openApp(app.name, i)"
    >
      <img
        :src="app.src"
        alt="App Icon"
        :class="{ hasBg: ['Youtube'].includes(app.name) }"
      />
      <span>{{ app.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useWindowStore } from "@/stores/windowStore";
import { useApp } from "@/composables/useApp";

const windowStore = useWindowStore();
const { getAppList } = useApp();

const appList = getAppList(true);

const openApp = (name: string, idx: number) => {
  const appName = name.replaceAll(" ", "");
  windowStore.openWindow(name, appName, idx);
};
</script>

<style lang="scss">
.app-icon-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 17vw 6vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  gap: 6vw;
  justify-items: center;
  align-content: start;

  .app-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vh;
    width: 100%;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 22%;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
      &.hasBg {
        background-color: white;
      }
    }

    span {
      font-size: clamp(10px, 2.8vw, 14px);
      color: var(--text-color-100);
      text-align: center;
      white-space: nowrap;
    }
  }
}

@media (orientation: landscape) {
  .app-icon-list {
    gap: 13vw;
    padding: 4vw 13vw;
  }
}
</style>
