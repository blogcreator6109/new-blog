<template>
  <div class="site-header-mobile">
    <div class="left">
      <Clock />
    </div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import Clock from "@/components/Mobile/SiteHeader/Clock.vue";
</script>

<style lang="scss" scoped>
.site-header-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vw;
}
</style>
