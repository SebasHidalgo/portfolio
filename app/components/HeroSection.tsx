"use client";

import { useEffect, useState } from "react";

const typingTexts = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Backend Engineer",
  "React Specialist",
  "Problem Solver",
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GraphQL",
  "Redis",
  "Prisma",
  "Tailwind",
  "Python",
  "Kubernetes",
  "MongoDB",
];

export default function HeroSection() {
  const [displayed, setDisplayed] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingTexts[typingIndex];
    const speed = deleting ? 60 : 100;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setTypingIndex((typingIndex + 1) % typingTexts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, typingIndex]);

  return (
    <section
      id="hero"
      className="relative z-1 min-h-screen flex flex-col justify-center items-center text-center px-8 pt-[80px]"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(79,142,247,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Floating code card */}
      <div className="glass animate-float absolute top-[18%] right-[8%] p-4 px-5 rounded-xl hidden flex-col gap-1.5 max-w-[240px]">
        <div className="font-mono text-[0.75rem] text-primary">
          <span className="text-secondary">const</span>{" "}
          <span className="text-accent">dev</span>{" "}
          <span className="text-muted">= {`{`}</span>
        </div>

        <div className="font-mono text-[0.75rem] text-muted pl-3">
          <span className="text-foreground">passion</span>:{" "}
          <span className="text-accent">true,</span>
        </div>

        <div className="font-mono text-[0.75rem] text-muted pl-3">
          <span className="text-foreground">coffee</span>:{" "}
          <span className="text-accent">∞</span>
        </div>

        <div className="font-mono text-[0.75rem] text-muted">{`}`}</div>
      </div>

      {/* Status badge */}
      <div className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full mb-8 text-[0.85rem] font-medium text-[#4ade80] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)]">
        <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80] animate-pulse-dot" />
        Disponible para nuevas oportunidades
      </div>

      {/* Main heading */}
      <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] mb-4 tracking-[-0.02em]">
        Hola, soy <span className="gradient-text">Guillermo</span>
      </h1>

      {/* Typewriter */}
      <div className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold h-12 flex items-center justify-center gap-1 mb-6 text-[#c0c8e8]">
        <span>{displayed}</span>
        <span className="typing-cursor inline-block w-[3px] h-[1.2em] bg-linear-to-b from-primary to-secondary rounded-[2px] ml-[2px]" />
      </div>

      {/* Bio */}
      <p className="text-[1.1rem] text-muted max-w-[600px] leading-[1.8] mb-10">
        Construyo experiencias web de alto impacto combinando{" "}
        <span className="text-primary">interfaces elegantes</span> con{" "}
        <span className="text-secondary">arquitecturas robustas</span>.
        Apasionado por el código limpio y las soluciones creativas.
      </p>

      {/* CTA buttons */}
      <div className="flex gap-4 flex-wrap justify-center mb-20">
        <a href="#projects" className="btn-primary no-underline">
          <span className="flex items-center gap-2">
            Ver Proyectos
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>

        <a href="#contact" className="btn-secondary">
          Contáctame
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-subtle text-[0.75rem] tracking-[0.15em]">
          SCROLL
        </span>
        <div
          className="w-px h-[60px] animate-[float_2s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(79,142,247,0.8), transparent)",
          }}
        />
      </div>

      {/* Tech ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 border-t border-card bg-[linear-gradient(to_right,var(--bg-primary),transparent_5%,transparent_95%,var(--bg-primary))]">
        <div className="flex gap-12 animate-[ticker_35s_linear_infinite] whitespace-nowrap w-max">
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={i}
              className="text-subtle text-[0.85rem] font-mono flex items-center gap-2"
            >
              <span
                className={`w-1 h-1 rounded-full ${
                  i % 3 === 0
                    ? "bg-primary"
                    : i % 3 === 1
                      ? "bg-secondary"
                      : "bg-accent"
                }`}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
