<template>
  <div class="desktop-container">
    <SiteHeader />
    <button @click="change">
      {{ colorMode.value === "dark" ? "Dark" : "light" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "./Desktop/SiteHeader.vue";
const colorMode = useColorMode();
const change = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<style lang="scss"></style>
