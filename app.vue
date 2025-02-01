<template>
  <ClientOnly>
    <component :is="deviceComponent" />
  </ClientOnly>
</template>

<script setup>
const { isMobile } = useDevice();

// 동적으로 컴포넌트 임포트
const deviceComponent = computed(() =>
  isMobile.value
    ? defineAsyncComponent(() => import("~/components/Mobile.vue"))
    : defineAsyncComponent(() => import("~/components/Desktop.vue"))
);
</script>

<style lang="scss">
@use "@/assets/scss/base/reset.scss" as *;
@use "@/assets/scss/base/variables.scss" as *;
@use "@/assets/scss/base/font.scss" as *;
@use "@/assets/scss/base/base.scss" as *;
</style>
