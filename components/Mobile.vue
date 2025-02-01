<template>
  <div class="mobile-container">
    <BackgroundImage />
    <AppIconList />
    <WindowList />
  </div>
</template>

<script setup lang="ts">
import BackgroundImage from "@/components/Mobile/BackgroundImage.vue";
import AppIconList from "@/components/Mobile/AppIconList.vue";
import WindowList from "@/components/Mobile/WindowList.vue";
</script>

<style lang="scss">
.mobile-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
