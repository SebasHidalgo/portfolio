"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/database/tables/project";
import { ActionButtons, EmptyState } from "@/app/admin/components/ui";
import { Plus, X } from "lucide-react";
import { Project } from "@/types";

type ProjectPayload = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
};

const EMPTY_PROJECT = {
  title: "",
  description: "",
  image: "",
  techStack: "",
  demoUrl: "",
  githubUrl: "",
};

const accent = "#00f2ff";
const glow = "rgba(0,242,255,0.35)";

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectData, setProjectData] = useState({ ...EMPTY_PROJECT });

  const { data: projects = initialProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    initialData: initialProjects,
  });

  const createMut = useMutation({
    mutationFn: (data: ProjectPayload) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
      resetForm();
    },
    onError: () => toast.error("Error creating project"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectPayload }) =>
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully!");
      resetForm();
    },
    onError: () => toast.error("Error updating project"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
    },
    onError: () => toast.error("Error deleting project"),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setProjectData({ ...EMPTY_PROJECT });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...projectData,
      techStack:
        projectData.techStack.length > 0
          ? projectData.techStack.split(",").map((s) => s.trim())
          : [],
    };
    if (editingId) {
      updateMut.mutate({ id: editingId, data: payload });
    } else {
      createMut.mutate(payload);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) deleteMut.mutate(id);
  };

  const startEdit = (item: Project) => {
    setEditingId(item.id);
    setShowForm(true);
    setProjectData({
      title: item.title,
      description: item.description,
      image: item.image,
      techStack: item.techStack.join(", "),
      demoUrl: item.demoUrl || "",
      githubUrl: item.githubUrl || "",
    });
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1.5"
            style={{ color: accent }}
          >
            // {String(projects.length).padStart(2, "0")} items
          </p>

          <h1 className="text-[30px] font-extrabold text-white leading-none">
            Projects
          </h1>
        </div>

        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200
        ${showForm ? "bg-white/10 text-gray-400" : "text-background"}
      `}
          style={
            showForm
              ? {}
              : {
                  background: `linear-gradient(135deg,${accent},${accent}99)`,
                  boxShadow: `0 0 24px ${glow}`,
                }
          }
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Cancel" : "Add Project"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="adm-glass rounded-2xl overflow-hidden mb-10 relative">
          <div
            className="h-[3px]"
            style={{ background: `linear-gradient(90deg,${accent},${glow})` }}
          />

          <div className="px-8 py-7">
            <h2 className="text-lg font-bold text-white mb-6">
              {editingId ? "Edit Project" : "New Project"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="md:col-span-2">
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Project Title *
                  </label>
                  <input
                    className="adm-input"
                    value={projectData.title}
                    onChange={(e) =>
                      setProjectData({ ...projectData, title: e.target.value })
                    }
                    placeholder="e.g. My Awesome Project"
                    required
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Description *
                  </label>
                  <textarea
                    className="adm-input resize-y"
                    rows={3}
                    value={projectData.description}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Image URL *
                  </label>
                  <input
                    className="adm-input"
                    value={projectData.image}
                    onChange={(e) =>
                      setProjectData({ ...projectData, image: e.target.value })
                    }
                    placeholder="/projects/1.jpg"
                    required
                  />
                </div>

                {/* Tech Stack */}
                <div className="md:col-span-2">
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Tech Stack (comma-separated) *
                  </label>
                  <input
                    className="adm-input"
                    value={projectData.techStack}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        techStack: e.target.value,
                      })
                    }
                    placeholder="React, Next.js, Supabase"
                    required
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    GitHub URL
                  </label>
                  <input
                    className="adm-input"
                    value={projectData.githubUrl}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        githubUrl: e.target.value,
                      })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>

                {/* Demo */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Live Demo URL
                  </label>
                  <input
                    className="adm-input"
                    value={projectData.demoUrl}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        demoUrl: e.target.value,
                      })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  className="w-full py-3 rounded-lg font-bold text-sm transition disabled:opacity-50"
                  style={{
                    background: accent,
                    color: "#0a0a0f",
                  }}
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards */}
      {projects.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Project"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {projects.map((p) => (
            <div
              key={p.id}
              className="adm-card flex flex-col"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{p.title}</h3>

                <ActionButtons
                  onEdit={() => startEdit(p)}
                  onDelete={() => handleDelete(p.id)}
                  editColor={accent}
                />
              </div>

              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {p.techStack.slice(0, 3).map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold"
                    style={{
                      background: "rgba(0,242,255,0.1)",
                      color: accent,
                    }}
                  >
                    {t}
                  </span>
                ))}

                {p.techStack.length > 3 && (
                  <span className="text-xs text-gray-500 pt-1">
                    +{p.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
