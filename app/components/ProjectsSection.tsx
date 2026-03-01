"use client";

import { useState } from "react";
import GithubSVG from "./svg/GithubSVG";

const defaultProjects = [
  {
    title: "Nova Commerce",
    desc: "Plataforma e-commerce headless con seguimiento de inventario en tiempo real, recomendaciones IA y integración Stripe.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    gradient: "linear-gradient(135deg, #4f8ef7 0%, #a855f7 100%)",
    emoji: "🛒",
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "CryptoBoard",
    desc: "Dashboard de seguimiento de criptomonedas con gráficos interactivos, WebSocket en tiempo real e integración de billetera.",
    tech: ["React", "WebSocket", "Chart.js", "TypeScript"],
    gradient: "linear-gradient(135deg, #22d3ee 0%, #4f8ef7 100%)",
    emoji: "📊",
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "SynthAPI",
    desc: "API RESTful robusta para procesamiento de imágenes con IA generativa, rate limiting, caché y autenticación segura.",
    tech: ["Node.js", "Express", "JWT", "Redis", "Docker"],
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    emoji: "⚡",
    category: "backend",
    github: "https://github.com",
    demo: "https://example.com",
  },
];

const filters = [
  { label: "Todos", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Full Stack", value: "fullstack" },
];

export default function ProjectsSection({
  projects = [],
}: {
  projects?: any[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const displayProjects =
    projects.length > 0
      ? projects.map((p, i) => ({
          title: p.title,
          desc: p.description,
          category: p.category.toLowerCase().replace(" ", ""),
          tech: p.techStack,
          demo: p.demoUrl || "#",
          github: p.githubUrl || "#",
          gradient:
            i % 2 === 0
              ? "linear-gradient(135deg, #4f8ef7 0%, #a855f7 100%)"
              : "linear-gradient(135deg, #22d3ee 0%, #4f8ef7 100%)",
          emoji: p.category.toLowerCase().includes("front")
            ? "🎨"
            : p.category.toLowerCase().includes("back")
              ? "⚙️"
              : "🚀",
        }))
      : defaultProjects;

  const filtered =
    activeFilter === "all"
      ? displayProjects
      : displayProjects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="
    relative z-1
    py-[100px] px-8
    bg-[linear-gradient(180deg,transparent,rgba(79,142,247,0.03),transparent)]
  "
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="
          text-secondary
          font-mono
          text-[0.85rem]
          mb-3
          tracking-[0.2em]
        "
          >
            // 02. PROYECTOS
          </p>

          <h2 className="section-title gradient-text-blue-purple">
            Trabajo Destacado
          </h2>

          <p className="section-subtitle">
            Colección de aplicaciones web de alto rendimiento construidas con
            tecnologías modernas
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`
            px-[22px] py-2
            rounded-full
            border
            font-medium
            text-[0.9rem]
            font-sans
            transition-all duration-300
            cursor-none
            ${
              activeFilter === f.value
                ? "border-[rgba(79,142,247,0.6)] bg-[rgba(79,142,247,0.15)] text-primary shadow-[0_0_20px_rgba(79,142,247,0.2)]"
                : "border-white/10 bg-transparent text-muted"
            }
          `}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="project-card glass"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card banner */}
              <div
                className="
              h-[180px]
              relative
              overflow-hidden
              flex items-center justify-center
            "
                style={{ background: project.gradient }}
              >
                {/* Grid pattern overlay */}
                <div
                  className="
                absolute inset-0
                bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
                bg-size-[20px_20px]
              "
                />

                <div className="text-[5rem] relative z-1 drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                  {project.emoji}
                </div>

                {/* Category badge */}
                <div
                  className="
                absolute top-3 right-3
                px-3 py-1
                bg-black/40
                backdrop-blur-[10px]
                rounded-full
                text-[0.7rem]
                text-foreground
                font-semibold
                tracking-[0.05em]
                uppercase
              "
                >
                  {project.category === "fullstack"
                    ? "Full Stack"
                    : project.category}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-[1.15rem] font-bold text-foreground mb-[0.6rem]">
                  {project.title}
                </h3>

                <p className="text-[0.875rem] text-muted leading-[1.7] mb-4">
                  {project.desc}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-[6px] mb-5">
                  {project.tech.map((t: string) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary no-underline text-[0.85rem] px-[18px] py-[9px] flex-1 text-center"
                  >
                    Demo en vivo
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2 text-xs"
                  >
                    <GithubSVG width={14} height={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
