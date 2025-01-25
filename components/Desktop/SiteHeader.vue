<template>
  <header class="site-header">
    <div class="site-header__left">
      <div class="site-header__logo"></div>
    </div>
    <div class="site-header__right">
      <Clock />
    </div>
  </header>
</template>

<script setup>
import Clock from "./SiteHeader/Clock.vue";
</script>

<style lang="scss">
.site-header {
  background-color: var(--surface-100);
  height: $header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  font-size: 1.6rem;

  &__right {
    display: flex;
    align-items: center;
  }
}
</style>
