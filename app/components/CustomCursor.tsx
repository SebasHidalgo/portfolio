"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor");
    const follower = document.querySelector<HTMLElement>(".cursor-follower");

    if (!cursor || !follower) return;

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX - 6 + "px";
      cursor.style.top = mouseY - 6 + "px";
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX - 20 + "px";
      follower.style.top = followerY - 20 + "px";
      requestAnimationFrame(animateFollower);
    };

    window.addEventListener("mousemove", moveCursor);
    animateFollower();

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], .project-card, input, textarea",
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(2)";
        follower.style.width = "60px";
        follower.style.height = "60px";
        follower.style.borderColor = "rgba(168, 85, 247, 0.6)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        follower.style.width = "40px";
        follower.style.height = "40px";
        follower.style.borderColor = "rgba(79, 142, 247, 0.4)";
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor" />
      <div className="cursor-follower" />
    </>
  );
}
