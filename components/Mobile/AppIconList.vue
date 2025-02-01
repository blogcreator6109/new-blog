<template>
  <div class="app-icon-list">
    <button
      class="app-icon-item"
      v-for="(app, i) in appList"
      :key="app.name"
      @click="openApp(app.name, i)"
      :class="{
        hasBg: app.name === 'Youtube',
        maximizing: maximizingApp === app.name,
      }"
    >
      <img class="normal-icon" :src="app.src" alt="App Icon" />
      <!-- 앱 열릴 때 커지는 모션을 위한 아이콘 -->
      <img class="animation-icon" :src="app.src" alt="Animation Icon" />
      <span>{{ app.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useWindowStore } from "@/stores/windowStore";

const windowStore = useWindowStore();
const maximizingApp = ref("");

// 앱 아이콘 목록 (Window 폴더에서 가져오기)
const files = import.meta.glob("@/public/images/dock/*");

const appList = Object.keys(files).map((key) => {
  const name = key.split("/").pop()?.split(".")[0];
  if (!name) {
    console.error("파일 이름을 찾을 수 없습니다.", key);
    return {
      name: "",
      src: "",
    };
  }

  return {
    name,
    src: key.replace("/public", ""),
  };
});

const openApp = (name: string, i: number) => {
  const appName = name.replaceAll(" ", "");

  windowStore.openWindow(name, appName, i);

  maximizingApp.value = name;
  setTimeout(() => {
    maximizingApp.value = "";
  }, 1000);
};

onMounted(() => {
  document.querySelectorAll(".app-icon-item").forEach((el) => {
    const img = el.querySelector(".normal-icon") as HTMLImageElement;
    const animationIcon = el.querySelector(
      ".animation-icon"
    ) as HTMLImageElement;

    if (!img || !animationIcon) return;

    const rect = img.getBoundingClientRect();

    animationIcon.style.left = `${rect.left}px`;
    animationIcon.style.top = `${rect.top}px`;
    animationIcon.style.width = `${rect.width}px`;
    animationIcon.style.height = `${rect.height}px`;

    setTimeout(() => {
      animationIcon.classList.add("ready");
    }, 10);
  });
});
</script>

<style lang="scss">
.app-icon-list {
  display: grid;
  grid-template-columns: repeat(4, 15%);
  justify-content: space-evenly;
  row-gap: 10%;
  padding: 8% 0;

  .app-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 20%;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
      &.hasBg {
        background-color: white;
      }
    }

    .animation-icon {
      position: fixed;
      opacity: 0;
      &.ready {
        opacity: 1;
        transition: top 0.4s ease, left 0.4s ease, width 0.4s ease,
          height 0.4s ease, opacity 0.3s ease-out;
      }
    }

    &.maximizing {
      z-index: 1;
      .animation-icon {
        opacity: 0;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
      }
    }

    span {
      font-size: max(1.8vw, 1.2rem);
      color: var(--text-color-100);
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
