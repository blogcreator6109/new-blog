<template>
  <div class="window-list">
    <Window
      v-for="window in windows"
      :key="window.id"
      :class="{ fullscreen: window.isFullscreen }"
      :id="window.id"
      :component="window.component"
      :headerHeight="window.headerHeight"
      :minimized="window.isMinimized"
      :maximized="window.isMaximized"
      :fullscreen="window.isFullscreen"
      :style="style(window)"
      @focus="focus"
      @dragStart="dragStart"
      @resizeStart="resizeStart"
      @resizeHover="resizeHover"
      @resizeLeave="resizeLeave"
    >
    </Window>
  </div>
</template>

<script setup lang="ts">
import Window from "@/components/Desktop/WindowList/Window.vue";
import { useWindowStore } from "@/stores/windowStore";
import type { AppWindow } from "@/stores/windowStore";
import { setCursor } from "@/utils/style";

const windowStore = useWindowStore();
const windows = computed(() => windowStore.windows);

const startPosition = ref({ x: -1, y: -1 });
const currentWindow = ref<AppWindow | null>(null);
const currentDirection = ref<string | null>(null);

const style = (window: AppWindow) => ({
  transform: `translate(${window.x}px, ${window.y}px)`,
  width: `${window.width}px`,
  height: `${window.height}px`,
  zIndex: window.zIndex,
});

const focus = (id: number) => {
  currentWindow.value = windowStore.getWindowById(id) as AppWindow | null;
};

const dragStart = (e: MouseEvent) => {
  startPosition.value = { x: e.clientX, y: e.clientY };
  windowStore.isDragging = true;
};

const dragEnd = () => {
  currentWindow.value = null;
  windowStore.isDragging = false;
};

const resizeStart = (e: MouseEvent, id: number, direction: string) => {
  currentDirection.value = direction;
  windowStore.isResizing = true;
};

const resizeEnd = () => {
  if (currentDirection.value) {
    currentDirection.value = null;
    windowStore.isResizing = false;
  }

  setCursor(null);
};

const resizeLeave = () => {
  if (!currentDirection.value) {
    setCursor(null);
  }
};

const resizeHover = (direction: string) => {
  if (!currentDirection.value) {
    setCursor(direction);
  }
};

const onMouseDown = (e: MouseEvent) => {
  if (currentWindow.value === null) {
    windowStore.currentWindowId = null;
  }
};

const onMouseMove = (e: MouseEvent) => {
  if (currentWindow.value) {
    if (windowStore.isResizing) {
      windowStore.resizeWindow(
        currentWindow.value.id,
        currentWindow.value.x,
        currentWindow.value.y,
        currentWindow.value.height,
        currentWindow.value.width,
        currentDirection.value,
        e.clientX,
        e.clientY
      );
    } else if (windowStore.isDragging) {
      windowStore.updateWindowPosition(
        currentWindow.value.id,
        currentWindow.value.x + e.clientX - startPosition.value.x,
        currentWindow.value.y + e.clientY - startPosition.value.y
      );
    }
  }
};
const onMouseUp = (e: MouseEvent) => {
  dragEnd();
  resizeEnd();
};

onMounted(() => {
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", onMouseDown);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>

<style lang="scss">
@use "@/assets/scss/base/variables.scss" as *;

.window-list {
  position: fixed;
  top: $header-height;
  left: 0;
  width: 100%;
  height: calc(100% - $header-height);
}
</style>
