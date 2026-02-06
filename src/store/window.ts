import { initialZIndex, windowConfig } from "@/constans";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WindowState {
  windows: typeof windowConfig;
  nextZIndex: number;
  openWindow: (key: keyof typeof windowConfig, data?: any) => void;
  closeWindow: (key: keyof typeof windowConfig) => void;
  focusWindow: (key: keyof typeof windowConfig) => void;
}

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: windowConfig,
    nextZIndex: initialZIndex + 1,

    openWindow: (key: keyof typeof windowConfig, data = null) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    closeWindow: (key: keyof typeof windowConfig) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = initialZIndex;
        win.data = null;
      }),

    focusWindow: (key: keyof typeof windowConfig) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;
        
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
