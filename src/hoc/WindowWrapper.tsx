"use client";

import useWindowStore from "@/src/store/window";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

interface WindowWrapperProps {
  Component: React.ComponentType<any>;
  windowKey: string;
}

export default function WindowWrapper({
  Component,
  windowKey,
}: WindowWrapperProps) {
  const Wrapped: React.FC<any> = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { zIndex, isOpen } = windows[windowKey as keyof typeof windows];
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      const element = ref.current;
      if (!element || !isOpen) return;

      element.style.display = "block";

      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const element = ref.current;
      if (!element) return;

      const [instance] = Draggable.create(element, {
        onPress: () => focusWindow(windowKey as keyof typeof windows),
      });

      return () => instance.kill();
    }, []);

    return (
      <section
        id={windowKey}
        ref={ref}
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
