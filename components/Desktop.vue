<template>
  <div class="desktop-container">
    <BackgroundImage />
    <SiteHeader />
    <Dock />
    <WindowList />
  </div>
</template>

<script setup lang="ts">
import BackgroundImage from "./Desktop/BackgroundImage.vue";
import SiteHeader from "./Desktop/SiteHeader.vue";
import Dock from "./Desktop/Dock.vue";
import WindowList from "./Desktop/WindowList.vue";
</script>

<style lang="scss"></style>
