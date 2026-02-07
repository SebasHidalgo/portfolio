"use client";

import gsap from "gsap";
import useWindowStore from "@/src/store/window";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import WindowsControls from "@/src/components/windows/WindowsControls";

import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

interface WindowWrapperProps {
  Component: React.ComponentType<any>;
  windowKey: string;
  titleHeader: string;
}

export default function WindowWrapper({
  Component,
  windowKey,
  titleHeader,
}: WindowWrapperProps) {
  const Wrapped: React.FC<any> = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { zIndex, isOpen } = windows[windowKey as keyof typeof windows];
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
      const headerEl = windowHeaderRef.current;

      if (!windowEl || !headerEl) return;

      const [instance] = Draggable.create(windowEl, {
        trigger: headerEl,
        onPress: () => focusWindow(windowKey as keyof typeof windows),
      });

      return () => instance.kill();
    }, []);

    return (
      <section
        id={windowKey}
        ref={windowRef}
        style={{
          zIndex,
          display: isOpen ? "block" : "none",
        }}
        className="absolute"
      >
        <div id="window-header" ref={windowHeaderRef}>
          <WindowsControls target={windowKey} />
          <h2 className="font-bold text-sm text-center w-full">
            {titleHeader}
          </h2>
        </div>

        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName ?? Component.name ?? "Component"
  })`;

  return Wrapped;
}
