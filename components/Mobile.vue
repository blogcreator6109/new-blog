<template>
  <div class="mobile-container">
    <div class="mobile-wrapper">
      <BackgroundImage />
      <SiteHeader />
      <AppIconList />
      <WindowList />
    </div>
  </div>
</template>

<script setup lang="ts">
import BackgroundImage from "@/components/Mobile/BackgroundImage.vue";
import AppIconList from "@/components/Mobile/AppIconList.vue";
import WindowList from "@/components/Mobile/WindowList.vue";
import SiteHeader from "@/components/Mobile/SiteHeader.vue";
</script>

<style lang="scss">
.mobile-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding: 10px;
  background-color: white;

  .mobile-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 15vw;
    overflow: hidden;
    border: 7px solid black;
    box-shadow: 0 0 0px 3px #ccc, 0 0 10px 0 rgba(0, 0, 0, 0.8),
      inset 0 0 1px 0 gray;
  }
}

@media (orientation: landscape) {
  .mobile-container {
    .mobile-wrapper {
      border-radius: 10vw;
    }
  }
}
</style>
