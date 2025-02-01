import { defineStore } from "pinia";
import { getHeaderHeight } from "@/utils/style";

export interface AppWindow {
  id: number;
  title: string;
  component: string;

  headerHeight: number;

  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;

  minWidth: number;
  minHeight: number;

  isMinimized: boolean;
  isMaximized: boolean;
  isFullscreen: boolean;

  backupRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  dockIndex: number;
}

export const useWindowStore = defineStore("window", {
  state: () => ({
    windows: [] as AppWindow[],
    isResizing: false,
    isDragging: false,
    currentWindowId: null as number | null,

    // Resize 시 minWidth, minHeight 넘어갈 경우 이전 위치 기억
    lastY: 0,
    lastX: 0,
  }),

  getters: {
    isWindowOpen: (state) => (component: string) =>
      state.windows.some((w) => w.component === component),
    isFocusedWindow: (state) => (component: string) =>
      // 인덱스 가장 높은 윈도우가 포커스된 상태
      state.windows.findIndex((w) => w.component === component) ===
      state.windows.length - 1,

    getWindowById: (state) => (id: number) =>
      state.windows.find((w) => w.id === id) || null,

    currentWindowTitle: (state) => () => {
      return (
        state.windows.find((w) => w.id === state.currentWindowId)?.title ||
        "Blog Creator"
      );
    },
    isFullscreen: (state) => () => {
      return state.windows.some((w) => w.isFullscreen);
    },
  },

  actions: {
    openWindow(title: string, component: string, dockIndex: number) {
      if (this.isWindowOpen(component)) {
        this.focusWindow(component);
      } else {
        const x = 100;
        const y = 100;
        const width = 800;
        const height = 600;
        const minWidth = 300;
        const minHeight = 200;

        this.windows.push({
          id: Date.now(),
          title,
          component,
          dockIndex,
          isMinimized: false,
          isMaximized: false,
          isFullscreen: false,
          zIndex: this.windows.length + 1,
          headerHeight: 40,
          x,
          y,
          width,
          height,
          minWidth,
          minHeight,
          backupRect: {
            x,
            y,
            width,
            height,
          },
        });
        this.currentWindowId = this.windows[this.windows.length - 1].id;
      }
    },

    closeWindow(id: number) {
      this.windows = this.windows.filter((w) => w.id !== id);
    },

    minimizeWindow(id: number) {
      const w = this.windows.find((w) => w.id === id);
      if (w) {
        if (w.isMinimized) {
          w.isMinimized = false;
          // 지니 효과로 Dock 있는 곳으로 줄어들게 하기
        } else {
          w.isMinimized = true;
        }
      }
    },

    maximizeWindow(id: number) {
      const w = this.windows.find((w) => w.id === id);
      if (w) {
        if (w.isFullscreen) return;

        const dockRight = getDockRight();
        const headerHeight = getHeaderHeight();

        if (!w.isMaximized) {
          w.x = dockRight;
          w.y = headerHeight;
          w.width = window.innerWidth - dockRight;
          w.height = window.innerHeight - headerHeight;
          w.isMaximized = true;
          w.isFullscreen = false;
        } else {
          w.x = w.backupRect.x;
          w.y = w.backupRect.y;
          w.width = w.backupRect.width;
          w.height = w.backupRect.height;
          w.isMaximized = false;
          w.isFullscreen = false;
        }
      }
    },

    fullWindow(id: number) {
      const w = this.windows.find((w) => w.id === id);
      if (w) {
        if (!w.isFullscreen) {
          w.isFullscreen = true;
          this.toTopZIndex(id);

          w.backupRect = {
            x: w.x,
            y: w.y,
            width: w.width,
            height: w.height,
          };

          w.x = 0;
          w.y = 0;
          w.width = window.innerWidth;
          w.height = window.innerHeight;
          w.zIndex = 10000000;
        } else {
          w.x = w.backupRect.x;
          w.y = w.backupRect.y;
          w.width = w.backupRect.width;
          w.height = w.backupRect.height;
          w.isFullscreen = false;
        }
      }
    },

    focusWindow(component: string) {
      const windowId = this.windows.find((w) => w.component === component)?.id;
      if (windowId) {
        this.toTopZIndex(windowId);
        this.currentWindowId = windowId;
      }
    },

    toTopZIndex(id: number) {
      for (let i = 0; i < this.windows.length; i++) {
        if (this.windows[i].id === id) {
          this.windows[i].zIndex = this.windows.length - 1;
        } else {
          this.windows[i].zIndex -= 1;
        }
      }
    },

    updateWindowPosition(id: number, x: number, y: number) {
      if (y < getHeaderHeight()) {
        y = getHeaderHeight();
      }

      this.windows = this.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              x,
              y,
              isMaximized: false,
              backupRect: {
                x,
                y,
                width: w.backupRect.width,
                height: w.backupRect.height,
              },
            }
          : w
      );
    },

    updateWindowSize(id: number, width: number, height: number) {
      this.windows = this.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              width,
              height,
              isMaximized: false,
              backupRect: {
                x: w.backupRect.x,
                y: w.backupRect.y,
                width,
                height,
              },
            }
          : w
      );
    },

    resizeWindow(
      id: number,
      currX: number,
      currY: number,
      currHeight: number,
      currWidth: number,
      direction: string | null,
      mouseX: number,
      mouseY: number
    ) {
      const w = this.windows.find((w) => w.id === id);
      if (!w) return;

      // 헤더 높이 제한
      mouseY = Math.max(mouseY, getHeaderHeight());

      let newX = currX;
      let newY = currY;
      let newWidth = currWidth;
      let newHeight = currHeight;

      switch (direction) {
        case "top":
          const deltaY = mouseY - currY;
          newHeight = Math.max(w.minHeight, currHeight - deltaY);
          newY = currY + (currHeight - newHeight);
          break;
        case "bottom":
          newHeight = Math.max(w.minHeight, mouseY - currY);
          break;
        case "left":
          const deltaX = mouseX - currX;
          newWidth = Math.max(w.minWidth, currWidth - deltaX);
          newX = currX + (currWidth - newWidth);
          break;
        case "right":
          newWidth = Math.max(w.minWidth, mouseX - currX);
          break;
        case "top-left":
          const deltaYTL = mouseY - currY;
          const deltaXTL = mouseX - currX;
          newHeight = Math.max(w.minHeight, currHeight - deltaYTL);
          newWidth = Math.max(w.minWidth, currWidth - deltaXTL);
          newY = currY + (currHeight - newHeight);
          newX = currX + (currWidth - newWidth);
          break;
        case "top-right":
          const deltaYTR = mouseY - currY;
          newHeight = Math.max(w.minHeight, currHeight - deltaYTR);
          newWidth = Math.max(w.minWidth, mouseX - currX);
          newY = currY + (currHeight - newHeight);
          break;
        case "bottom-left":
          const deltaXBL = mouseX - currX;
          newHeight = Math.max(w.minHeight, mouseY - currY);
          newWidth = Math.max(w.minWidth, currWidth - deltaXBL);
          newX = currX + (currWidth - newWidth);
          break;
        case "bottom-right":
          newHeight = Math.max(w.minHeight, mouseY - currY);
          newWidth = Math.max(w.minWidth, mouseX - currX);
          break;
      }

      this.updateWindowSize(id, newWidth, newHeight);
      this.updateWindowPosition(id, newX, newY);
    },
  },
});
