<template>
  <div class="clock">
    {{ currentTime }}
  </div>
</template>

<script setup lang="ts">
const getTime = () => {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return time.replace(/AM|PM/g, "");
};

const currentTime = ref(getTime());
onMounted(() => {
  setInterval(() => {
    currentTime.value = getTime();
  }, 60 * 1000);
});
</script>

<style lang="scss" scoped>
.clock {
  font-size: max(3.8vw, 1.5rem);
  font-weight: 600;
}
</style>
