<template>
  <div
    class="window"
    :data-window-id="id"
    @click="closeWindow"
    v-show="isVisible"
  >
    <component :is="comp" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useWindowStore } from "@/stores/windowStore";
import { ref } from "vue";

const windowStore = useWindowStore();

const props = defineProps<{
  id: number;
  component: string;
}>();

const isVisible = ref(true);

const comp = computed(() =>
  defineAsyncComponent(
    () =>
      import(
        `@/components/Mobile/WindowList/WindowItems/${props.component}.vue`
      )
  )
);

const closeWindow = () => {
  isVisible.value = false;
  // 애니메이션이 끝난 후에 실제로 window를 제거
  setTimeout(() => {
    windowStore.closeWindow(props.id);
  }, 300); // gsap duration과 동일하게
};
</script>

<style lang="scss">
.window {
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 1);
}
</style>
