<template>
  <header class="site-header">
    <div class="site-header__left">
      <div class="logo">
        <Logo />
      </div>
      <div class="title">{{ currentWindowTitle }}</div>
    </div>
    <div class="site-header__right">
      <ThemeButton />
      <Clock />
    </div>
  </header>
</template>

<script setup>
import Clock from "./SiteHeader/Clock.vue";
import ThemeButton from "./SiteHeader/ThemeButton.vue";
import Logo from "@/assets/images/logo.svg?component";

import { useWindowStore } from "@/stores/windowStore";

const windowStore = useWindowStore();
const currentWindowTitle = computed(() => windowStore.currentWindowTitle());
</script>

<style lang="scss">
@use "@/assets/scss/base/variables.scss" as *;

.site-header {
  background-color: var(--header-bg);
  height: $header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;

  &__left {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      height: 80%;
      svg {
        height: 100%;
        .path {
          fill: var(--text-color-100);
          transition: fill 0.3s ease;
        }
      }
    }

    .title {
      font-weight: 700;
      margin-left: 1.8rem;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    height: 100%;
    column-gap: 1.5rem;
  }
}
</style>
