"use client";

import { techStack } from "@/constans";
import WindowWrapper from "@/src/hoc/WindowWrapper";
import { Check } from "lucide-react";
import WindowsControls from "./WindowsControls";

function Terminal() {
  return (
    <>
      <div className="window-header">
        <WindowsControls target="terminal" />
        <h2 className="font-bold text-sm text-center w-full">Tech Stack</h2>
      </div>

      <div className="text-sm font-roboto p-5">
        <div className="flex items-center ms-10">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="pt-5 my-5 border-t border-dashed space-y-1">
          {techStack.map((tech) => (
            <li key={tech.category} className="flex items-center">
              <Check className="text-[#00A154] w-5" size={20} />
              <h3 className="font-semibold text-[#00A154] w-32 ms-5">
                {tech.category}
              </h3>
              <ul className="flex items-center gap-3">
                {tech.items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < tech.items.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const TerminalWindow = WindowWrapper({
  Component: Terminal,
  windowKey: "terminal",
});

export default TerminalWindow;
