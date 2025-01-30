<template>
  <ClientOnly>
    <component :is="deviceComponent" />
  </ClientOnly>
</template>

<script setup>
const isMobile = useState("isMobile");

// 동적으로 컴포넌트 임포트
const deviceComponent = computed(() =>
  isMobile.value
    ? defineAsyncComponent(() => import("~/components/Mobile.vue"))
    : defineAsyncComponent(() => import("~/components/Desktop.vue"))
);
</script>

<style lang="scss"></style>
