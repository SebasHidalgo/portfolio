"use client";

import { useState } from "react";
import GithubSVG from "./svg/GithubSVG";
import type { Project } from "@/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Infer a display category from the project's tech stack + description.
 * This is needed because the Project table has no "category" column.
 */
function inferCategory(p: Project): "frontend" | "backend" | "fullstack" {
  const text = [...p.techStack, p.description, p.title].join(" ").toLowerCase();

  const isFront =
    /react|vue|angular|svelte|next|nuxt|css|tailwind|html|ui|ux|design|figma|sass|vite/.test(
      text,
    );
  const isBack =
    /node|express|django|laravel|spring|fastapi|api|rest|graphql|database|sql|prisma|redis|docker|kubernetes|server|backend|aws|gcp/.test(
      text,
    );

  if (isFront && isBack) return "fullstack";
  if (isBack) return "backend";
  if (isFront) return "frontend";
  return "fullstack";
}

function categoryEmoji(cat: string): string {
  if (cat === "frontend") return "🎨";
  if (cat === "backend") return "⚙️";
  return "🚀";
}

const GRADIENTS = [
  "linear-gradient(135deg, #4f8ef7 0%, #a855f7 100%)",
  "linear-gradient(135deg, #22d3ee 0%, #4f8ef7 100%)",
  "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  "linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
];

// ---------------------------------------------------------------------------
// Static fallback data
// ---------------------------------------------------------------------------

const defaultProjects = [
  {
    title: "Nova Commerce",
    desc: "Plataforma e-commerce headless con seguimiento de inventario en tiempo real, recomendaciones IA y integración Stripe.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    gradient: GRADIENTS[0],
    emoji: "🛒",
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "CryptoBoard",
    desc: "Dashboard de seguimiento de criptomonedas con gráficos interactivos, WebSocket en tiempo real e integración de billetera.",
    tech: ["React", "WebSocket", "Chart.js", "TypeScript"],
    gradient: GRADIENTS[1],
    emoji: "📊",
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "SynthAPI",
    desc: "API RESTful robusta para procesamiento de imágenes con IA generativa, rate limiting, caché y autenticación segura.",
    tech: ["Node.js", "Express", "JWT", "Redis", "Docker"],
    gradient: GRADIENTS[2],
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const hasDbProjects = projects.length > 0;

  // Enrich DB projects with UI-only fields (category inferred, gradient, emoji)
  const displayProjects = hasDbProjects
    ? projects.map((p, i) => {
        const category = inferCategory(p);
        return {
          id: p.id,
          title: p.title,
          desc: p.description,
          tech: p.techStack,
          demo: p.demoUrl ?? null,
          github: p.githubUrl ?? null,
          category,
          gradient: GRADIENTS[i % GRADIENTS.length],
          emoji: categoryEmoji(category),
        };
      })
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
                    href={project.demo ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary no-underline text-[0.85rem] px-[18px] py-[9px] flex-1 text-center"
                  >
                    Demo en vivo
                  </a>

                  <a
                    href={project.github ?? "#"}
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

        {/* Empty state when a filter yields no results */}
        {filtered.length === 0 && (
          <p className="text-center text-muted text-[0.9rem] mt-8">
            No hay proyectos en esta categoría todavía.
          </p>
        )}
      </div>
    </section>
  );
}
