<template>
  <div class="battery">
    <div class="battery-icon">
      <div
        class="battery-icon-bar"
        :style="{ width: `${level}%` }"
        :class="{
          mid: level >= 20 && level < 50,
          low: level < 20,
        }"
      ></div>
      <img
        src="@/assets/images/thunder.webp"
        alt="thunder"
        v-if="isCharging"
        class="battery-icon-charging"
      />
    </div>
  </div>
</template>

<script setup>
const level = ref(0);
const isCharging = ref(false);

const updateBatteryStatus = (battery) => {
  level.value = battery.level * 100;
  isCharging.value = battery.charging;
};

onMounted(async () => {
  try {
    if ("getBattery" in navigator) {
      // 다른 디바이스에서는 Battery API 사용
      const battery = await navigator.getBattery();
      updateBatteryStatus(battery);

      battery.addEventListener("levelchange", () =>
        updateBatteryStatus(battery)
      );
      battery.addEventListener("chargingchange", () =>
        updateBatteryStatus(battery)
      );
    } else {
      level.value = 100;
    }
  } catch (error) {
    console.warn("Battery status not available:", error);
    level.value = -1;
  }
});
</script>

<style lang="scss" scoped>
.battery {
  display: flex;
  align-items: center;
  justifygcontent: center;
  margin-left: 0.3rem;
  position: relative;
  &-icon {
    width: 2.2rem;
    height: 1.1rem;
    border: 1px solid var(--window-bg-200);

    $line-color: #888;
    box-shadow: 0 0 0 1.3px $line-color;
    border-radius: 0.3rem;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: calc(100% + 0.15rem);
      transform: translateY(-50%);
      width: 0.22rem;
      height: 0.35rem;
      background-color: $line-color;
      border-radius: 0 0.2rem 0.2rem 0;
    }

    &-bar {
      height: 100%;
      background-color: #37c75a;
      border-radius: 0.2rem;
      &.mid {
        background-color: #f5c71a;
      }

      &.low {
        background-color: #ff453a;
      }
    }

    &-charging {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1.6rem;
      height: 1.2rem;
    }
  }
}
</style>
