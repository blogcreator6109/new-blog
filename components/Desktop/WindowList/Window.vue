<template>
  <div
    class="window"
    @mousedown="focus"
    :class="{ maximizing: isMaximizing }"
    :style="{
      transition: isMaximizing ? `all ${maximizingTime}s ease` : 'none',
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
}>();

const isMaximizing = ref(false);

const maximizingTime = ref(0.5);

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
  // windowStore.minimizeWindow(props.id);
};

const maximize = () => {
  if (!isMaximizing.value) {
    windowStore.maximizeWindow(props.id);
    isMaximizing.value = true;
    setTimeout(() => {
      isMaximizing.value = false;
    }, maximizingTime.value * 1000);
  }
};

const full = () => {
  windowStore.fullWindow(props.id);
  isMaximizing.value = true;
  setTimeout(() => {
    isMaximizing.value = false;
  }, maximizingTime.value * 1000);
};
</script>

<style lang="scss">
.window {
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--surface-100);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  background-color: #555;
}
</style>
