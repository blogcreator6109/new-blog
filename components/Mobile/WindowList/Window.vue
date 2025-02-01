<template>
  <div
    class="window"
    :style="{
      left: x,
      top: y,
      width,
      height,
      opacity,
    }"
  >
    <component :is="comp" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps<{
  component: string;
  dockIndex: number;
}>();

const x = ref<string | null>(null);
const y = ref<string | null>(null);
const width = ref<string | null>(null);
const height = ref<string | null>(null);
const opacity = ref<number>(0);

const comp = computed(() =>
  defineAsyncComponent(
    () =>
      import(
        // TODO: 모바일에서 사용하는 컴포넌트 경로 수정
        `@/components/Desktop/WindowList/WindowItems/${props.component}.vue`
      )
  )
);

onMounted(() => {
  const dockEl = document.querySelectorAll(".app-icon-item");
  const dockRect = dockEl[props.dockIndex].getBoundingClientRect();

  const startX = dockRect.left;
  const startY = dockRect.top;
  const startWidth = dockRect.width;
  const startHeight = dockRect.height;

  x.value = startX + "px";
  y.value = startY + "px";
  width.value = startWidth + "px";
  height.value = startHeight + "px";
  opacity.value = 0;

  setTimeout(() => {
    x.value = "0px";
    y.value = "0px";
    width.value = "100vw";
    height.value = "100vh";
    opacity.value = 1;
  }, 50);
});
</script>

<style lang="scss">
.window {
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 1);

  transition: top 0.4s ease, left 0.4s ease, width 0.4s ease, height 0.4s ease,
    opacity 0.1s ease-in;
}
</style>
