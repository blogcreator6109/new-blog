<template>
  <div class="window-list">
    <TransitionGroup
      name="window-transition"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <Window
        v-for="window in windows"
        :key="window.id"
        :id="window.id"
        :component="window.component"
        :dockIndex="window.dockIndex"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Window from "./WindowList/Window.vue";
import { useWindowStore } from "@/stores/windowStore";
import gsap from "gsap";

const windowStore = useWindowStore();
const windows = computed(() => windowStore.windows);

const getRect = (dockIndex: number) => {
  const dockEls = document.querySelectorAll(".app-icon-item");
  const dockEl = dockEls[dockIndex];
  if (!dockEl) return null;
  return dockEl.getBoundingClientRect();
};

const getMobilePadding = () => {
  const appIconList = document.querySelector(".app-icon-list");
  if (!appIconList) return { leftPadding: 0, topPadding: 0 };
  const appIconListRect = appIconList.getBoundingClientRect();
  const leftPadding = appIconListRect.left;
  const topPadding = appIconListRect.top;
  return { leftPadding, topPadding };
};

const onEnter = (el: Element, done: () => void) => {
  const window = windows.value.find(
    (w) => w.id === Number(el.getAttribute("data-window-id"))
  );
  if (!window) return done();

  const rect = getRect(window.dockIndex);
  if (!rect) return done();

  const { leftPadding, topPadding } = getMobilePadding();

  gsap.fromTo(
    el,
    {
      left: rect.x - leftPadding + "px",
      top: rect.y - topPadding + "px",
      width: rect.width + "px",
      height: rect.height + "px",
    },
    {
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.3,
      ease: "power2.easeInOut",
      onComplete: done,
    }
  );
};

const onLeave = (el: Element, done: () => void) => {
  const window = windows.value.find(
    (w) => w.id === Number(el.getAttribute("data-window-id"))
  );
  if (!window) return done();

  const rect = getRect(window.dockIndex);
  if (!rect) return done();

  const { leftPadding, topPadding } = getMobilePadding();

  gsap.to(el, {
    left: rect.x - leftPadding + "px",
    top: rect.y - topPadding + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    duration: 0.3,
    ease: "power2.easeInOut",
    onComplete: done,
  });
};
</script>

<style lang="scss">
.window-list {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
