"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import GithubSVG from "./svg/GithubSVG";
import type { Project } from "@/types";
import CollapsibleDescription from "./CollapsibleDescription";

type RepoLink = { label: string; url: string };

function getRepoLinks(project: Project): RepoLink[] {
  const raw = project.githubUrls as unknown;
  if (Array.isArray(raw)) {
    return raw
      .filter((l) => l && typeof l.url === "string" && l.url)
      .map((l) => ({ label: l.label || "Repository", url: l.url }));
  }
  if (raw && typeof raw === "object") {
    return Object.entries(raw as Record<string, unknown>)
      .filter(([, url]) => typeof url === "string" && url)
      .map(([label, url]) => ({ label, url: url as string }));
  }
  return [];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = (project: Project) => {
    setActiveProjectModal(project);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setActiveProjectModal(null);
    }, 200);
  };

  useEffect(() => {
    if (activeProjectModal) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProjectModal]);

  useEffect(() => {
    if (!activeProjectModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProjectModal]);

  const modalRepos = activeProjectModal ? getRepoLinks(activeProjectModal) : [];

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <header className="section-head">
        <h2 id="projects-title" className="h2">
          <span className="h2-num">2</span>Projects
        </h2>
        <p className="lede">
          Collection of high-performance web applications built with modern
          technologies
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="border border-dashed border-rule p-10 text-center text-sm text-ink-2">
          No projects published yet.
        </p>
      ) : (
        <ol className="border-t border-ink">
          {projects.map((project, i) => {
            const repos = getRepoLinks(project);
            const figure = `2.${i + 1}`;
            const hasLinks =
              Boolean(project.demoUrl) ||
              repos.length > 0 ||
              Boolean(project.githubUrl);

            return (
              <li
                key={project.id}
                className="group grid gap-6 border-b border-rule py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
              >
                <figure className="lg:col-span-5">
                  <div className="aspect-[16/10] overflow-hidden border border-ink bg-sheet transition-colors group-hover:border-signal-ink">
                    {project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="label grid h-full place-items-center">
                        No image
                      </div>
                    )}
                  </div>
                  <figcaption className="label mt-2 transition-colors group-hover:text-signal-ink">
                    Fig. {figure} — {project.title}
                  </figcaption>
                </figure>

                <div className="lg:col-span-7">
                  <h3 className="font-stretch-[110%] text-2xl font-bold leading-tight tracking-[-0.01em]">
                    {project.title}
                  </h3>

                  <CollapsibleDescription
                    text={project.description}
                    maxChars={150}
                  />

                  <dl className="mt-6 border-t border-rule">
                    <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3">
                      <dt className="label pt-1">Stack</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.techStack.length > 0 ? (
                          project.techStack.map((tech, idx) => (
                            <span key={`${tech}-${idx}`} className="chip">
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-ink-2">
                            Not specified
                          </span>
                        )}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3">
                      <dt className="label pt-1">Links</dt>
                      <dd className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link inline-flex items-center gap-1"
                          >
                            Live demo{" "}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                        )}

                        {repos.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => openModal(project)}
                            className="link inline-flex items-center gap-2"
                          >
                            <GithubSVG width={14} height={14} />
                            Repositories ({repos.length})
                          </button>
                        ) : repos.length === 1 ? (
                          <a
                            href={repos[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link inline-flex items-center gap-2"
                          >
                            <GithubSVG width={14} height={14} />
                            {repos[0].label}
                          </a>
                        ) : project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link inline-flex items-center gap-2"
                          >
                            <GithubSVG width={14} height={14} />
                            GitHub
                          </a>
                        ) : null}

                        {!hasLinks && (
                          <span className="text-ink-2">Private project</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {activeProjectModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 transition-opacity duration-200 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="repos-title"
            className={`w-full max-w-sm border border-ink bg-sheet p-6 shadow-sheet transition-transform duration-200 ${
              isModalVisible ? "translate-y-0" : "translate-y-2"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id="repos-title" className="text-lg font-bold">
                Repositories
              </h3>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="btn-icon"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-2 text-sm text-ink-2">
              <span className="font-medium text-ink">
                {activeProjectModal.title}
              </span>{" "}
              is split into the following repositories:
            </p>

            <ul className="mt-5 border-t border-rule">
              {modalRepos.map((link, idx) => (
                <li key={`${link.url}-${idx}`} className="border-b border-rule">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 py-3 text-sm font-medium transition-colors hover:text-signal-ink"
                  >
                    <span className="inline-flex items-center gap-2">
                      <GithubSVG width={16} height={16} />
                      {link.label}
                    </span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
