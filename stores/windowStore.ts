import { defineStore } from "pinia";

export interface AppWindow {
  id: number;
  title: string;
  component: string;
  zIndex: number;
  headerHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
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
  },

  actions: {
    openWindow(title: string, component: string) {
      if (this.isWindowOpen(component)) {
        this.focusWindow(component);
      } else {
        this.windows.push({
          id: Date.now(),
          title,
          component,
          isMinimized: false,
          zIndex: this.windows.length + 1,
          headerHeight: 40,
          x: 100,
          y: 100,
          width: 800,
          height: 600,
        });
        this.currentWindowId = this.windows[this.windows.length - 1].id;
      }
    },

    closeWindow(id: number) {
      this.windows = this.windows.filter((w) => w.id !== id);
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
        w.id === id ? { ...w, x, y } : w
      );
    },

    updateWindowSize(id: number, width: number, height: number) {
      this.windows = this.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
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
