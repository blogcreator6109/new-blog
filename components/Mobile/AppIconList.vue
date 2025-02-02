<template>
  <div class="app-icon-list">
    <button
      v-for="(app, i) in appList"
      :key="app.name"
      class="app-icon-item"
      :style="getPosition(i)"
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

const windowStore = useWindowStore();

// 앱 아이콘 목록 (Window 폴더에서 가져오기)
const files = import.meta.glob("@/public/images/dock/*");
const components = import.meta.glob(
  "@/components/Mobile/WindowList/WindowItems/*"
);

const appList = Object.keys(files)
  .filter((key) => {
    const name = key.split("/").pop()?.split(".")[0];
    return Object.keys(components).some((comp) => {
      const compName = comp.split("/").pop()?.split(".")[0];
      return compName === name;
    });
  })
  .map((key) => {
    const name = key.split("/").pop()?.split(".")[0];
    if (!name) {
      console.error("파일 이름을 찾을 수 없습니다.", key);
      return {
        name: "",
        src: "",
      };
    }

    return {
      name,
      src: key.replace("/public", ""),
    };
  });

const openApp = (name: string, i: number) => {
  const appName = name.replaceAll(" ", "");

  windowStore.openWindow(name, appName, i);
};

const getPosition = (index: number) => {
  const COLUMNS = 4;
  const ROWS = 6;
  const PADDING_PERCENT = 6;

  const row = Math.floor(index / COLUMNS);
  const col = index % COLUMNS;

  const size = "min(15vw, 80px)";

  // 전체 너비/높이에서 패딩을 뺀 실제 사용 영역
  const contentWidth = `(100% - ${PADDING_PERCENT * 2}%)`;
  const contentHeight = `(100% - ${PADDING_PERCENT * 2}%)`;

  // 컬럼/로우 사이의 간격을 포함한 하나의 셀 크기
  const cellWidth = `(${contentWidth} / ${COLUMNS})`;
  const cellHeight = `(${contentHeight} / ${ROWS})`;

  return {
    position: "fixed",
    left: `calc(${PADDING_PERCENT}% + ${cellWidth} * ${col} - ${size} / 2 + ${cellWidth} / 2)`,
    top: `calc(${PADDING_PERCENT}% + ${cellHeight} * ${row} - ${size} / 2 + ${cellHeight} / 2)`,
    width: size,
    height: size,
  };
};
</script>

<style lang="scss">
.app-icon-list {
  position: fixed;

  .app-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 20%;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
      &.hasBg {
        background-color: white;
      }
    }

    span {
      font-size: max(1.3vw, 1.1rem);
      color: var(--text-color-100);
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
