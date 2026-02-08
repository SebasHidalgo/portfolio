"use client";

import gsap from "gsap";
import useWindowStore from "@/src/store/window";
import WindowsControls from "@/src/components/windows/WindowsControls";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { WindowKey } from "@/constans";

import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

interface WindowWrapperProps {
  Component: React.ComponentType<any>;
  windowKey: WindowKey;
}

export default function WindowWrapper({
  Component,
  windowKey,
}: WindowWrapperProps) {
  const Wrapped: React.FC<any> = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { zIndex, isOpen } = windows[windowKey];
    const windowRef = useRef<HTMLDivElement>(null);
    const windowHeaderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      const windowEl = windowRef.current;
      if (!windowEl || !isOpen) return;

      windowEl.style.display = "block";

      gsap.fromTo(
        windowEl,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const windowEl = windowRef.current;
      if (!windowEl) return;

      const headerEl = windowEl.querySelector(".window-header");
      if (!headerEl) return;

      const [instance] = Draggable.create(windowEl, {
        trigger: headerEl,
      });

      return () => instance.kill();
    }, []);

    return (
      <section
        onClick={() => focusWindow(windowKey)}
        id={windowKey}
        ref={windowRef}
        style={{
          zIndex,
          display: isOpen ? "block" : "none",
        }}
        className="absolute"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName ?? Component.name ?? "Component"
  })`;

  return Wrapped;
}
