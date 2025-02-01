<template>
  <div class="app-icon-list">
    <button
      class="item"
      v-for="(name, i) in docNames"
      :key="name"
      @click="openApp(name, i)"
    >
      <img :src="`/images/dock/${name}.webp`" alt="App Icon" />
      <span>{{ name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useWindowStore } from "@/stores/windowStore";

const windowStore = useWindowStore();

// 앱 아이콘 목록 (Window 폴더에서 가져오기)
const files = import.meta.glob(
  "@/components/Desktop/WindowList/WindowItems/*.vue"
);
const docNames = Object.keys(files).map((key) => {
  const fileName = key.split("/").pop();
  if (!fileName) {
    console.error("파일 이름을 찾을 수 없습니다.", key);
    return "";
  }

  return fileName
    .replace(".vue", "")
    .split(/(?=[A-Z])/)
    .join(" ");
});

const openApp = (name: string, i: number) => {
  const appName = name.replaceAll(" ", "");

  windowStore.openWindow(name, appName, i);
};
</script>

<style lang="scss">
.app-icon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 1.5rem;
  padding: 2rem;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 6rem;
      height: 6rem;
      border-radius: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    span {
      font-size: 1.2rem;
      color: var(--text-color-100);
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
