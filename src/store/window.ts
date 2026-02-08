import {
  initialZIndex,
  windowConfig,
  WindowInstance,
  WindowKey,
} from "@/constans";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WindowState {
  windows: Record<WindowKey, WindowInstance>;
  nextZIndex: number;
  openWindow: (key: WindowKey, data?: any) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
}

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: windowConfig,
    nextZIndex: initialZIndex + 1,

    openWindow: (key: WindowKey, data = null) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    closeWindow: (key: WindowKey) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = initialZIndex;
        win.data = null;
      }),

    focusWindow: (key: WindowKey) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
