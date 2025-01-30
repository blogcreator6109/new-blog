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
}

export const useWindowStore = defineStore("window", {
  state: () => ({
    windows: [] as AppWindow[],
    isResizing: false,
    isDragging: false,
  }),

  getters: {
    isWindowOpen: (state) => (component: string) =>
      state.windows.some((w) => w.component === component),
    getWindowById: (state) => (id: number) =>
      state.windows.find((w) => w.id === id) || null,
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
          zIndex: this.windows.length,
          headerHeight: 30,
          x: 100,
          y: 100,
          width: 800,
          height: 600,
        });
      }
    },

    closeWindow(id: number) {
      this.windows = this.windows.filter((w) => w.id !== id);
    },

    focusWindow(component: string) {
      const windowId = this.windows.find((w) => w.component === component)?.id;
      if (windowId) {
        this.updateWindowZIndex(windowId, this.windows.length);
      }
    },

    updateWindowZIndex(id: number, zIndex: number) {
      this.windows = this.windows.map((w) =>
        w.id === id ? { ...w, zIndex } : w
      );
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
