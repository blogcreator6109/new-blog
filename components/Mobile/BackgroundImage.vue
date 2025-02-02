<template>
  <div class="background-image">
    <img src="/images/background-mobile.webp" alt="Background" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
