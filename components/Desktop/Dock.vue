<template>
  <nav
    class="dock"
    :style="{ width: `${BASE_WIDTH}px` }"
    :class="{
      disabled: windowStore.isDragging || windowStore.isResizing,
      fullscreen: windowStore.isFullscreen(),
    }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <button
      class="dock-item"
      v-for="(name, i) in docNames"
      :key="i"
      :class="{
        active: windowStore.windows.some((window) => window.title === name),
      }"
      @click="openApp(name, i)"
    >
      <img
        :style="{ minWidth: widths[i] + 'px' }"
        :src="`/images/dock/${name}.webp`"
        ref="dockRef"
        :alt="name"
        width="60"
      />

      <p>{{ name }}</p>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useWindowStore } from "@/stores/windowStore";

const windowStore = useWindowStore();

const openApp = (name: string, i: number) => {
  const appName = name.replaceAll(" ", "");

  windowStore.openWindow(name, appName, i);
  windowStore.setIsMinimizing();
};

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

// 독 설정 상수
const BASE_WIDTH = 40; // 기본 너비
const MAX_WIDTH = BASE_WIDTH * 2; // 최대 너비
const ANIMATION_SPEED = 0.07; // 애니메이션 속도
const MAX_DISTANCE = 250; // 마우스 영향을 받는 최대 거리

const dockRef = ref<HTMLImageElement[]>([]);
const widths = ref<number[]>(Array(docNames.length).fill(BASE_WIDTH));
let animationFrameId: number | null = null;

/**
 * 아이콘 크기를 목표 크기로 부드럽게 변경하는 함수
 */
const updateWidths = (targetWidths: number[]): void => {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }

  const step = (MAX_WIDTH - BASE_WIDTH) * ANIMATION_SPEED;
  let needsUpdate = false;

  widths.value = widths.value.map((currentWidth, index) => {
    const targetWidth = targetWidths[index];
    if (currentWidth === targetWidth) return currentWidth;

    needsUpdate = true;
    if (targetWidth < currentWidth) {
      return Math.max(currentWidth - step, targetWidth);
    }
    return Math.min(currentWidth + step, targetWidth);
  });

  if (needsUpdate) {
    animationFrameId = window.requestAnimationFrame(() =>
      updateWidths(targetWidths)
    );
  }
};

/**
 * 마우스 이동에 따른 아이콘 크기 계산
 */
const onMouseMove = (e: MouseEvent): void => {
  if (!dockRef.value) return;

  const dock = e.currentTarget as HTMLElement;
  const dockRect = dock.getBoundingClientRect();
  const mouseY = e.clientY - dockRect.top;

  const targetWidths = dockRef.value.map((dockItemEl) => {
    const rect = dockItemEl.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2 - dockRect.top; // 아이콘 중앙 좌표
    const distance = Math.abs(centerY - mouseY); // 마우스와 아이콘 중앙 좌표 사이의 거리

    // 거리에 따라 아이콘 크기 조절
    // 거리가 0일 때 최대 크기, MAX_DISTANCE일 때 기본 크기가 되도록 선형 보간
    const ratio = Math.max(0, 1 - distance / MAX_DISTANCE);
    return BASE_WIDTH + (MAX_WIDTH - BASE_WIDTH) * ratio;
  });

  updateWidths(targetWidths);
};

/**
 * 마우스가 독을 벗어날 때 모든 아이콘을 기본 크기로 복원
 */
const onMouseLeave = (): void => {
  updateWidths(Array(widths.value.length).fill(BASE_WIDTH));
};
</script>

<style lang="scss">
.dock {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 0;
  box-sizing: content-box;
  transform: translateY(-50%);
  z-index: 100000;
  background-color: var(--dock-bg);
  backdrop-filter: blur(10px);
  box-shadow: 2px 2px 4px 4px var(--dock-shadow);
  border-radius: 1.4rem;

  $padding-left: 1.1rem;
  padding: 0.8rem calc($padding-left * 2 / 3) 0.8rem $padding-left;
  margin-left: 1rem;
  transition: all 0.3s ease;
  border: 1px solid var(--dock-border);

  &.disabled {
    pointer-events: none;
  }

  &.fullscreen {
    transform: translate(-100%, -50%);
    margin-left: -2px;
  }

  .dock-item {
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 0.6rem 0;

    &.active {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: -$padding-left + 0.2rem;
        top: 50%;
        transform: translateY(-50%);
        width: 4.5px;
        height: 4.5px;
        background-color: var(--dock-active-bg);
        border-radius: 50%;
      }
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    p {
      display: none;
      align-items: center;
      margin-left: 1.8rem;
      font-size: 1.6rem;
      background-color: var(--window-bg-200);
      padding: 0.2em 0.8em;
      border-radius: 5px;
      border: 1px solid var(--window-border);
      box-shadow: 0 0 1px 1px var(--dock-bg);
      color: var(--text-color-100);
      white-space: nowrap;
    }

    &:hover {
      p {
        display: block;
      }
    }
  }
}
</style>
