"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor");

    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX - 6 + "px";
      cursor.style.top = mouseY - 6 + "px";
    };

    window.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], .project-card, input, textarea",
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(2)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor" />
    </>
  );
}
