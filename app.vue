<template>
  <Desktop v-if="isDesktop" />
  <Mobile v-else />
</template>

<script setup>
const { isDesktop } = useDevice();
</script>

<style lang="scss">
button {
  padding: 0.3em 0.6em;
  font-size: 20px;
  background-color: lightblue;
}
</style>
