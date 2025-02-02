<template>
  <div class="clock">
    {{ currentTime }}
  </div>
</template>

<script setup lang="ts">
const getTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const currentTime = ref(getTime());
onMounted(() => {
  setInterval(() => {
    currentTime.value = getTime();
  }, 60 * 1000);
});
</script>

<style lang="scss">
.clock {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
