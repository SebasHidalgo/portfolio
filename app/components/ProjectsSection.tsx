"use client";

import { useState } from "react";

const projects = [
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
  {
    title: "Connectify",
    desc: "Plataforma de red social moderna para comunidades de desarrolladores con compartición de código y syntax highlighting.",
    tech: ["React", "GraphQL", "PostgreSQL", "Prisma"],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    emoji: "🌐",
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "TaskFlow",
    desc: "Herramienta de productividad drag-and-drop con espacios colaborativos, modo oscuro y capacidades offline PWA.",
    tech: ["React", "DnD", "IndexedDB", "PWA", "Zustand"],
    gradient: "linear-gradient(135deg, #10b981 0%, #22d3ee 100%)",
    emoji: "✅",
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "StreamCore",
    desc: "Arquitectura de backend de streaming de video de alta concurrencia con HLS, bitrate adaptativo y redes CDN.",
    tech: ["Node.js", "FFmpeg", "HLS", "AWS S3", "Kubernetes"],
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    emoji: "🎬",
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

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 2rem",
        background:
          "linear-gradient(180deg, transparent, rgba(79,142,247,0.03), transparent)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              color: "#a855f7",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.85rem",
              marginBottom: "0.75rem",
              letterSpacing: "0.2em",
            }}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: "8px 22px",
                borderRadius: "50px",
                border: "1px solid",
                borderColor:
                  activeFilter === f.value
                    ? "rgba(79,142,247,0.6)"
                    : "rgba(255,255,255,0.1)",
                background:
                  activeFilter === f.value
                    ? "rgba(79,142,247,0.15)"
                    : "transparent",
                color: activeFilter === f.value ? "#4f8ef7" : "#8892b0",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "none",
                transition: "all 0.3s ease",
                boxShadow:
                  activeFilter === f.value
                    ? "0 0 20px rgba(79,142,247,0.2)"
                    : "none",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="project-card glass"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="card-glow" />

              {/* Card banner */}
              <div
                style={{
                  height: "180px",
                  background: project.gradient,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Grid pattern overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div
                  style={{
                    fontSize: "5rem",
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 4px 15px rgba(0,0,0,0.3))",
                  }}
                >
                  {project.emoji}
                </div>
                {/* Category badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    padding: "4px 12px",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "50px",
                    fontSize: "0.7rem",
                    color: "#f0f0ff",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category === "fullstack"
                    ? "Full Stack"
                    : project.category}
                </div>
              </div>

              {/* Card content */}
              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#f0f0ff",
                    marginBottom: "0.6rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#8892b0",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  {project.desc}
                </p>

                {/* Tech stack */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      padding: "9px 18px",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    Demo en vivo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      padding: "9px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
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
