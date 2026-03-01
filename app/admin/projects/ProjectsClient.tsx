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
  initialProjects: any[];
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
    mutationFn: (data: any) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
      resetForm();
    },
    onError: () => toast.error("Error creating project"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
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

  const startEdit = (item: any) => {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36,
        }}
      >
        <div>
          <p
            style={{
              color: accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            // {String(projects.length).padStart(2, "0")} items
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
            }}
          >
            Projects
          </h1>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 22px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            background: showForm
              ? "rgba(255,255,255,0.07)"
              : `linear-gradient(135deg,${accent},${accent}99)`,
            color: showForm ? "#888" : "#0a0a0f",
            boxShadow: showForm ? "none" : `0 0 24px ${glow}`,
            transition: "all 0.2s",
          }}
        >
          <span className="msym" style={{ fontSize: 20 }}>
            {showForm ? "close" : "add"}
          </span>
          {showForm ? "Cancel" : "Add Project"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          className="adm-glass"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 40,
            position: "relative",
          }}
        >
          <div
            style={{
              height: 3,
              background: `linear-gradient(90deg,${accent},${glow})`,
            }}
          />
          <div style={{ padding: "28px 32px" }}>
            <h2
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 24,
                fontSize: 18,
              }}
            >
              {editingId ? "Edit Project" : "New Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      color: accent,
                      display: "block",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}
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
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      color: accent,
                      display: "block",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}
                  >
                    Description *
                  </label>
                  <textarea
                    className="adm-input"
                    rows={3}
                    value={projectData.description}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      color: accent,
                      display: "block",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}
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
                <div style={{ gridColumn: "1/-1" }}>
                  <label
                    style={{
                      color: accent,
                      display: "block",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}
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
                <div>
                  <label
                    style={{
                      color: accent,
                      display: "block",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}
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
                <div>
                  <label
                    style={{
                      color: accent,
                      display: "block",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}
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
              <div style={{ marginTop: 24 }}>
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 10,
                    border: "none",
                    background: accent,
                    color: "#0a0a0f",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    width: "100%",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 24,
          }}
        >
          {projects.map((p: any) => (
            <div key={p.id} className="adm-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {p.title}
                </h3>
                <ActionButtons
                  onEdit={() => startEdit(p)}
                  onDelete={() => handleDelete(p.id)}
                  editColor={accent}
                />
              </div>
              <p
                style={{
                  color: "#888",
                  fontSize: 13,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  marginBottom: 16,
                }}
              >
                {p.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: "auto",
                }}
              >
                {p.techStack.slice(0, 3).map((t: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(0,242,255,0.1)",
                      color: accent,
                      padding: "4px 10px",
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
                {p.techStack.length > 3 && (
                  <span style={{ color: "#666", fontSize: 11, paddingTop: 4 }}>
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
