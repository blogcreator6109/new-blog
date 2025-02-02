<template>
  <ClientOnly>
    <component :is="deviceComponent" />
  </ClientOnly>
</template>

<script setup>
const { isMobile } = useDevice();

// 초기에 한 번만 결정되도록 수정
const deviceComponent = defineAsyncComponent(() =>
  import(`~/components/${isMobile.value ? "Mobile" : "Desktop"}.vue`)
);
</script>

<style lang="scss">
@use "@/assets/scss/base/reset.scss" as *;
@use "@/assets/scss/base/variables.scss" as *;
@use "@/assets/scss/base/font.scss" as *;
@use "@/assets/scss/base/base.scss" as *;
</style>
