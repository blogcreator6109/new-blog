<template>
  <div class="window-list">
    <Window
      v-for="window in windows"
      :id="window.id"
      :component="window.component"
      :headerHeight="window.headerHeight"
      :style="{
        transform: `translate(${window.x}px, ${window.y}px)`,
        width: `${window.width}px`,
        height: `${window.height}px`,
      }"
      :key="window.id"
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

const onMouseUp = (e: MouseEvent) => {
  dragEnd();
  resizeEnd();
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

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>

<style lang="scss">
.window-list {
  position: fixed;
  top: $header-height;
  left: 0;
  width: 100%;
  height: calc(100% - $header-height);
}
</style>
