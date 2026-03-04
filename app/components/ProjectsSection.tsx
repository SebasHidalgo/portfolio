"use client";

import Link from "next/link";
import GithubSVG from "./svg/GithubSVG";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative z-1 py-[100px] px-8 bg-[linear-gradient(180deg,transparent,rgba(79,142,247,0.03),transparent)]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-mono text-[0.85rem] mb-3 tracking-[0.2em]">
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

        {/* Projects grid */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card glass"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card banner */}
              <div className="relative aspect-video overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px]" />
                )}
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-[1.15rem] font-bold text-foreground mb-[0.6rem]">
                  {project.title}
                </h3>

                <p className="text-[0.875rem] text-muted leading-[1.7] mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-[6px] mb-5">
                  {project.techStack.map((t: string) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="btn-primary no-underline text-[0.85rem] px-[18px] py-[9px] flex-1 text-center"
                    >
                      Demo en vivo
                    </Link>
                  )}

                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="btn-secondary flex items-center gap-2 text-xs"
                    >
                      <GithubSVG width={14} height={14} />
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
