<template>
  <div
    class="window-header"
    :style="{
      height: `${headerHeight}px`,
      paddingLeft: `${headerHeight / 3}px`,
    }"
    @mousedown="(e) => $emit('dragStart', e)"
    @dblclick="$emit('maximize')"
  >
    <div class="left">
      <div class="btn" @click="$emit('close')">
        <img src="images/window/mac-close-btn.webp" alt="close" />
        <img src="images/window/mac-close-btn_active.webp" alt="close-active" />
      </div>
      <div class="btn" @click="$emit('minimize')">
        <img src="images/window/mac-min-btn.webp" alt="minimize" />
        <img
          src="images/window/mac-min-btn_active.webp"
          alt="minimize-active"
        />
      </div>
      <div class="btn" @click="$emit('full')">
        <img src="images/window/mac-max-btn.webp" alt="maximize" />
        <img
          src="images/window/mac-max-btn_active.webp"
          alt="maximize-active"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headerHeight: Number,
});

const emit = defineEmits(["close", "minimize", "maximize", "dragStart"]);
</script>

<style>
.window-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    column-gap: 7px;
    .btn {
      width: 12px;
      height: 12px;
      img {
        width: 100%;
        height: 100%;
        &:nth-of-type(2) {
          display: none;
        }
      }
    }

    &:hover {
      .btn {
        img {
          &:nth-of-type(1) {
            display: none;
          }
          &:nth-of-type(2) {
            display: block;
          }
        }
      }
    }
  }
}
</style>
