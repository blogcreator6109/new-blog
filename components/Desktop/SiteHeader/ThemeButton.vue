<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="
      colorMode.value === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'
    "
  >
    <SunIcon v-show="colorMode.value === 'light'" class="theme-icon" />
    <MoonIcon v-show="colorMode.value === 'dark'" class="theme-icon" />
  </button>
</template>

<script setup lang="ts">
import SunIcon from "images/sun.svg?component";
import MoonIcon from "images/moon.svg?component";

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<style lang="scss">
.theme-toggle {
  aspect-ratio: 1;
  height: 70%;

  svg {
    width: 100%;
    height: 100%;
    path {
      fill: var(--text-color-100);
      transition: fill 0.3s ease;
    }
  }
}
</style>
