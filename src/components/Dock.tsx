"use client";

import gsap from "gsap";
import { dockApps } from "@/constans";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll("button");

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2 / 20000));

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    };
    const handleMouseMove = (e: React.MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, { scale: 1, y: 0, duration: 0.2, ease: "power2.out" });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove as any);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove as any);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (id: string, canOpen: boolean) => {};

  return (
    <section className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 select-none max-sm:hidden">
      <div
        ref={dockRef}
        className="bg-white/20 backdrop-blur-md justify-between rounded-2xl p-1.5 flex items-end gap-1.5"
      >
        {dockApps.map((app) => (
          <div
            key={app.name}
            className="relative flex justify-center hover:sca"
          >
            <button
              type="button"
              className="size-14 3xl:size-20 cursor-pointer"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app.id, app.canOpen)}
            >
              <img
                src={app.icon}
                alt={app.name}
                className={` ${app.canOpen ? "" : "opacity-60"} object-cover object-center`}
              />
            </button>
          </div>
        ))}
        <Tooltip
          id="dock-tooltip"
          place="top"
          className="!py-1 !px-3 !w-fit !text-center !text-sm !rounded-md !shadow-2xl"
        />
      </div>
    </section>
  );
}
