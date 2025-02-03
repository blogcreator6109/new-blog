<template>
  <div
    class="window"
    @mousedown="focus"
    :class="{
      focused: windowStore.isFocusedWindow(props.component),
      minimized,
    }"
    :style="{
      transition: getTransitionStyle(),
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

    <div class="window-content">
      <component :is="comp" :headerHeight="headerHeight" />
    </div>
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
  maximized: boolean;
  fullscreen: boolean;
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
  if (!props.fullscreen) {
    emit("dragStart", e, props.id);
  }
};

const close = () => {
  windowStore.closeWindow(props.id);
};

const minimize = () => {
  windowStore.setIsMinimizing();
  windowStore.minimizeWindow(props.id);
};

const maximize = () => {
  if (!props.fullscreen) {
    windowStore.setIsMaximizing();
    windowStore.maximizeWindow(props.id);
  }
};

const full = () => {
  windowStore.setIsMaximizing();
  windowStore.fullWindow(props.id);
};

const getTransitionStyle = () => {
  if (!windowStore.isMaximizing && !windowStore.isMinimizing) return "none";

  const transitions = [`all ${windowStore.animationTime}s ease`];

  if (props.minimized) {
    if (windowStore.isMinimizing) {
      transitions.push(`opacity ${windowStore.animationTime * 3}s ease-out`);
    } else {
      transitions.push("none");
    }
  } else if (windowStore.isMinimizing) {
    transitions.push(`opacity ${windowStore.animationTime / 3}s ease-in`);
  }

  return transitions.filter(Boolean).join(", ");
};
</script>

<style lang="scss">
.window {
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--window-bg-200);
  border-radius: 8px;
  box-shadow: 6px 8px 40px 30px var(--window-shadow), 0 0 0 0.5px #222222;
  border: 1.2px solid var(--window-border);
  display: flex;
  flex-direction: column;

  &.fullscreen {
    border-radius: 0;
  }

  &.minimized {
    opacity: 0;
    pointer-events: none;
  }

  .window-content {
    width: 100%;
    height: 100%;

    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
