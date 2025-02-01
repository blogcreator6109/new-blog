<template>
  <div class="desktop-container">
    <BackgroundImage />
    <SiteHeader />
    <Dock />
    <WindowList />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "./Desktop/SiteHeader.vue";
import Dock from "./Desktop/Dock.vue";
import WindowList from "./Desktop/WindowList.vue";
import BackgroundImage from "./Desktop/BackgroundImage.vue";
</script>

<style lang="scss"></style>
