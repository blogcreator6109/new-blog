<template>
  <div
    class="window"
    @mousedown="focus"
    :class="{
      minimizing: windowStore.isMinimizing,
      maximizing: windowStore.isMaximizing,
      focused: windowStore.isFocusedWindow(props.component),
      minimized: minimized,
    }"
    :style="{
      transition:
        windowStore.isMaximizing || windowStore.isMinimizing
          ? [
              `height ${windowStore.animationTime}s ease`,
              `width ${windowStore.animationTime}s ease`,
              `transform ${windowStore.animationTime}s ease`,
              !props.minimized
                ? windowStore.isMinimizing
                  ? `opacity ${windowStore.animationTime / 3}s ease-in`
                  : ''
                : windowStore.isMinimizing
                ? `opacity ${windowStore.animationTime * 3}s ease-out`
                : 'none',
            ].join(', ')
          : 'none',
    }"
  >
    <ResizeObserver
      @resize-hover="(direction) => $emit('resizeHover', direction)"
      @resize-start="
        (event, direction) => $emit('resizeStart', event, id, direction)
      "
      @resize-leave="() => $emit('resizeLeave', id)"
    />
    <WindowHeader
      :headerHeight="headerHeight"
      @dragStart="dragStart"
      @close="close"
      @minimize="minimize"
      @maximize="maximize"
      @full="full"
    />

    <component :is="comp" :headerHeight="headerHeight" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useWindowStore } from "@/stores/windowStore";
import ResizeObserver from "./Window/ResizeObserver.vue";
import WindowHeader from "./Window/WindowHeader.vue";

const windowStore = useWindowStore();

const props = defineProps<{
  id: number;
  component: string;
  headerHeight: number;
  minimized: boolean;
}>();

const emit = defineEmits([
  "focus",
  "dragStart",
  "resizeHover",
  "resizeStart",
  "resizeLeave",
]);

const comp = computed(() =>
  defineAsyncComponent(
    () =>
      import(
        `@/components/Desktop/WindowList/WindowItems/${props.component}.vue`
      )
  )
);

const focus = () => {
  windowStore.focusWindow(props.component);
  emit("focus", props.id);
};

const dragStart = (e: MouseEvent) => {
  emit("dragStart", e, props.id);
};

const close = () => {
  windowStore.closeWindow(props.id);
};

const minimize = () => {
  windowStore.minimizeWindow(props.id);
  windowStore.setIsMinimizing();
};

const maximize = () => {
  if (!windowStore.isMaximizing) {
    windowStore.maximizeWindow(props.id);
    windowStore.setIsMaximizing();
  }
};

const full = () => {
  windowStore.fullWindow(props.id);
  windowStore.setIsMaximizing();
};
</script>

<style lang="scss">
.window {
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--window-bg-200);
  border-radius: 8px;
  box-shadow: 6px 8px 40px 30px var(--window-shadow);
  border: 1px solid var(--window-border);
  display: flex;
  flex-direction: column;

  &.fullscreen {
    border-radius: 0;
  }

  &.minimized {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
