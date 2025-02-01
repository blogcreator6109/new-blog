<template>
  <div class="background-image">
    <img src="/images/background.webp" alt="Background" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use "@/assets/scss/base/variables.scss" as *;

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
