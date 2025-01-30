import { defineStore } from "pinia";

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

  isMinimized: boolean;
  isMaximized: boolean;
  isFullscreen: boolean;

  backupRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const useWindowStore = defineStore("window", {
  state: () => ({
    windows: [] as AppWindow[],
    isResizing: false,
    isDragging: false,
    currentWindowId: null as number | null,
  }),

  getters: {
    isWindowOpen: (state) => (component: string) =>
      state.windows.some((w) => w.component === component),
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
    openWindow(title: string, component: string) {
      if (this.isWindowOpen(component)) {
        this.focusWindow(component);
      } else {
        const x = 100;
        const y = 100;
        const width = 800;
        const height = 600;

        this.windows.push({
          id: Date.now(),
          title,
          component,
          isMinimized: false,
          isMaximized: false,
          isFullscreen: false,
          zIndex: this.windows.length + 1,
          headerHeight: 40,
          x,
          y,
          width,
          height,
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

    maximizeWindow(id: number) {
      const w = this.windows.find((w) => w.id === id);
      if (w) {
        const dockRight = getDockRight();
        const headerHeight = getHeaderHeight();

        if (!w.isMaximized) {
          w.backupRect = {
            x: w.x,
            y: w.y,
            width: w.width,
            height: w.height,
          };

          w.x = dockRight;
          w.y = headerHeight;
          w.width = window.innerWidth - dockRight;
          w.height = window.innerHeight - headerHeight;
          w.isMaximized = true;
        } else {
          w.x = w.backupRect.x;
          w.y = w.backupRect.y;
          w.width = w.backupRect.width;
          w.height = w.backupRect.height;
          w.isMaximized = false;
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
      let newX = currX;
      let newY = currY;
      let newHeight = currHeight;
      let newWidth = currWidth;

      switch (direction) {
        case "top":
          newY = mouseY;
          newHeight = currHeight - (mouseY - currY);
          break;
        case "bottom":
          newHeight = mouseY - currY;
          break;
        case "left":
          newX = mouseX;
          newWidth = currWidth - (mouseX - currX);
          break;
        case "right":
          newWidth = mouseX - currX;
          break;
        case "top-left":
          newX = mouseX;
          newY = mouseY;
          newWidth = currWidth - (mouseX - currX);
          newHeight = currHeight - (mouseY - currY);
          break;
        case "top-right":
          newWidth = mouseX - currX;
          newHeight = currY + currHeight - mouseY;
          newX = mouseX - newWidth;
          newY = mouseY;
          break;
        case "bottom-left":
          newWidth = currWidth - (mouseX - currX);
          newHeight = mouseY - currY;
          newX = mouseX;
          newY = mouseY - newHeight;
          break;
        case "bottom-right":
          newWidth = mouseX - currX;
          newHeight = mouseY - currY;
          newX = mouseX - newWidth;
          newY = mouseY - newHeight;
          break;
      }

      this.updateWindowSize(id, newWidth, newHeight);
      this.updateWindowPosition(id, newX, newY);
    },
  },
});
