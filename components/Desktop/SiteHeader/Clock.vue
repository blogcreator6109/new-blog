<template>
  <div class="clock">
    {{ time }}
  </div>
</template>

<script setup>
const time = ref(
  new Date().toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
);

let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    time.value = new Date().toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss">
.clock {
  display: flex;
  align-items: center;
}
</style>
