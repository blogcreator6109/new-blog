<template>
  <div class="internet">
    <div
      v-for="i in 4"
      :key="i"
      class="bar"
      :class="{ active: i <= strength }"
    ></div>
  </div>
</template>

<script setup>
import { useNetworkStatus } from "@/composables/useNetworkStatus";

const { strength } = useNetworkStatus();
</script>

<style lang="scss" scoped>
.internet {
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
  height: 1rem;
  padding: 0 0.5rem;

  .bar {
    width: 0.3rem;
    background-color: var(--text-color-100);
    transform-origin: bottom;
    opacity: 0.4;

    &.active {
      opacity: 1;
    }

    &:nth-of-type(1) {
      height: 25%;
    }
    &:nth-of-type(2) {
      height: 50%;
    }
    &:nth-of-type(3) {
      height: 75%;
    }
    &:nth-of-type(4) {
      height: 100%;
    }
  }
}
</style>
