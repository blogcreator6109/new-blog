<template>
  <div
    @mousedown="onMouseDown"
    @mousemove.stop="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="resize top"></div>
    <div class="resize right"></div>
    <div class="resize bottom"></div>
    <div class="resize left"></div>
    <div class="resize top-right"></div>
    <div class="resize bottom-right"></div>
    <div class="resize bottom-left"></div>
    <div class="resize top-left"></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["resizeHover", "resizeStart", "resizeLeave"]);

const onMouseMove = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("resize")) {
    const direction = target.classList.item(1);

    emit("resizeHover", direction);
  }
};

const onMouseDown = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const direction = target.classList.item(1);
  emit("resizeStart", e, direction);
};

const onMouseLeave = () => {
  emit("resizeLeave");
};
</script>

<style lang="scss" scoped>
.resize {
  position: absolute;
  $size: 8px;

  &.top {
    top: -$size;
    left: 0;
    width: 100%;
    height: $size;
  }

  &.right {
    top: 0;
    right: -$size;
    width: $size;
    height: 100%;
  }

  &.bottom {
    bottom: -$size;
    left: 0;
    width: 100%;
    height: $size;
  }

  &.left {
    left: -$size;
    top: 0;
    width: $size;
    height: 100%;
  }

  &.top-right {
    top: -$size;
    right: -$size;
    width: $size * 2;
    height: $size * 2;
  }

  &.bottom-right {
    bottom: -$size;
    right: -$size;
    width: $size * 2;
    height: $size * 2;
  }

  &.bottom-left {
    bottom: -$size;
    left: -$size;
    width: $size * 2;
    height: $size * 2;
  }

  &.top-left {
    top: -$size;
    left: -$size;
    width: $size * 2;
    height: $size * 2;
  }
}
</style>
