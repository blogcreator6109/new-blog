<template>
  <div class="site-header-mobile">
    <div class="left">
      <Clock />
    </div>
    <div class="center">
      <Camera />
    </div>
    <div class="right">
      <Internet />
      <Battery />
    </div>
  </div>
</template>

<script setup lang="ts">
import Clock from "@/components/Mobile/SiteHeader/Clock.vue";
import Camera from "@/components/Mobile/SiteHeader/Camera.vue";
import Internet from "@/components/Mobile/SiteHeader/Internet.vue";
import Battery from "@/components/Mobile/SiteHeader/Battery.vue";
</script>

<style lang="scss" scoped>
.site-header-mobile {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5vw;
  display: flex;
  padding: 0 9vw;
  margin-top: 4vw;
  justify-content: space-between;
  align-items: flex-end;
  color: var(--text-color-100);

  .left {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .center {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

// 가로 모드일 때 숨기때
@media (orientation: landscape) {
  .site-header-mobile {
    display: none;
  }
}
</style>
