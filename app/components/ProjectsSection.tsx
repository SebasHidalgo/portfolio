"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GithubSVG from "./svg/GithubSVG";
import type { Project } from "@/types";
import CollapsibleDescription from "./CollapsibleDescription";
import { SquareArrowOutUpRight, X } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (project: Project) => {
    setActiveProjectModal(project);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setActiveProjectModal(null);
    }, 300);
  };

  useEffect(() => {
    if (activeProjectModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProjectModal]);

  return (
    <section
      id="projects"
      className="relative z-1 py-[100px] px-8 bg-[linear-gradient(180deg,transparent,rgba(79,142,247,0.03),transparent)]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-mono text-[0.85rem] mb-3 tracking-[0.2em]">
            // 02. PROJECTS
          </p>

          <h2 className="section-title gradient-text-blue-purple">
            Work Highlight
          </h2>

          <p className="section-subtitle">
            Collection of high-performance web applications built with modern
            technologies
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

                <CollapsibleDescription
                  text={project.description}
                  maxChars={150}
                />

                {/* Tech stack */}
                <div className="flex flex-wrap gap-[6px] mb-5">
                  {project.techStack.map((t: string) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="btn-primary no-underline text-[0.85rem] px-[18px] py-[9px] flex-1 text-center min-w-[120px]"
                    >
                      Live Demo
                    </Link>
                  )}

                  {project.githubUrls && project.githubUrls.length > 0 ? (
                    <button
                      onClick={() => openModal(project)}
                      className="btn-secondary flex items-center justify-center gap-2 text-xs px-[14px] py-[9px]"
                      title="Ver Repositorios"
                    >
                      <GithubSVG width={14} height={14} />
                      Repositories
                    </button>
                  ) : project.githubUrl ? (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="btn-secondary flex items-center justify-center gap-2 text-xs px-[14px] py-[9px]"
                      title="Repositorio Principal"
                    >
                      <GithubSVG width={14} height={14} />
                      GitHub
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Multiple Repos */}
      {activeProjectModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
            isModalVisible
              ? "bg-black/60 backdrop-blur-sm opacity-100"
              : "bg-black/0 backdrop-blur-none opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`glass max-w-sm w-full p-6 relative transition-all duration-300 transform ${
              isModalVisible
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-4 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GithubSVG width={20} height={20} />
              Repositories
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              The project{" "}
              <span className="text-white font-semibold">
                {activeProjectModal.title}
              </span>{" "}
              is divided into the following repositories:
            </p>

            <div className="space-y-3">
              {activeProjectModal.githubUrls?.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  target="_blank"
                  className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 transition-colors group"
                >
                  <span className="font-medium text-sm text-[#00f2ff]">
                    {link.label}
                  </span>
                  <SquareArrowOutUpRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
