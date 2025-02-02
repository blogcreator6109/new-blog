<template>
  <div class="camera">
    <div class="lens">
      <div class="lens-center-light"></div>
      <div class="lens-left-light"></div>
      <div class="lens-right-light"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.camera {
  border-radius: 10rem;
  max-width: 15rem;
  width: 100%;
  height: 2.5rem;

  background-color: black;
  padding: 0.85rem;

  .lens {
    height: 100%;
    margin-left: auto;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid #142327;
    position: relative;
    overflow: hidden;

    &-center-light {
      position: absolute;
      top: 80%;
      left: 70%;
      width: 30%;
      height: 30%;
      z-index: 10;
      background: radial-gradient(
        circle at center,
        rgb(255, 255, 255, 0.7),
        transparent 80%
      );
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &-left-light,
    &-right-light {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at 20% 30%,
        rgba(95, 223, 95, 1),
        transparent 40%
      );

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        height: 70%;
        transform: translate(-50%, -50%);
        background-color: black;
        border-radius: 50%;
      }
    }

    &-right-light {
      background: radial-gradient(
        circle at 70% 70%,
        rgba(0, 0, 255, 1),
        transparent 50%
      );
    }
  }
}
</style>
