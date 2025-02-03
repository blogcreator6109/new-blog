<template>
  <div class="notion-sidebar">
    <div class="notion-sidebar-header">
      <button @click="toHome">
        <HomeIcon />
        <span>홈</span>
      </button>
      <button @click="openSearch">
        <SearchIcon />
        <span>검색</span>
      </button>
    </div>
    <div class="notion-sidebar-body">
      <button class="title">카테고리</button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="toCategory(category.name)"
      >
        <div
          class="image"
          :class="{
            dark: colorMode.value === 'dark',
            icon: simpleIcon.includes(category.name),
          }"
        >
          <img
            :src="`/images/window/notion/categories/${category.name}.webp`"
            :alt="category.name"
          />
        </div>
        <span>{{ category.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeIcon from "@/assets/images/window/notion/home.svg?component";
import SearchIcon from "@/assets/images/window/notion/search.svg?component";
import { useNotionStore } from "@/stores/notionStore";
const store = useNotionStore();
const { categories } = storeToRefs(store);

const simpleIcon = ["Mac", "ETC", "Books"];
const colorMode = useColorMode();

// TODO: Skeleton 추가

const toCategory = async (categoryName: string) => {
  store.fetchPostList(categoryName);
};

const toHome = () => {
  store.fetchPostList();
};

const openSearch = () => {
  console.log("openSearch");
};

store.fetchCategories();
</script>

<style lang="scss">
.notion-sidebar {
  flex: 0 0 263px;
  height: 100%;
  background-color: var(--window-bg-200);
  border-right: 1px solid var(--window-bg-500);
  padding: 5rem 0.8rem;
  font-size: 1.5rem;
  color: var(--text-color-200);
  overflow-y: auto;

  &-header {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 0.9em;
    margin-top: 1.5rem;
  }

  button {
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    column-gap: 1.1rem;
    font-weight: 600;

    &:hover {
      background-color: var(--window-bg-600);
      cursor: pointer;
    }

    .image {
      width: 2rem;
      aspect-ratio: 1/1;
      &.dark.icon {
        img {
          filter: invert(1) brightness(0.8);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    svg {
      width: 2rem;
      height: 2rem;
      path {
        stroke: var(--text-color-200);
      }
    }
  }
}
</style>
