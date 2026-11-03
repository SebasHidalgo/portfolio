"use client";

import { useState } from "react";
import { Project } from "@/types";
import { EmptyState, Header, Card } from "@/app/admin/components";
import { useCrud } from "@/app/admin/hooks/useCrud";
import { ProjectForm } from "./ProjectsForm";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/database/tables/project";
import { deleteFile } from "@/lib/supabase/helpers";

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);

  const {
    data: projects,
    createMut,
    updateMut,
    deleteMut,
  } = useCrud<Project>({
    queryKey: ["projects"],
    getFn: getProjects,
    createFn: createProject,
    updateFn: updateProject,
    deleteFn: deleteProject,
    initialData: initialProjects,
    successMessages: {
      create: "Project created successfully!",
      update: "Project updated successfully!",
      delete: "Project deleted successfully!",
    },
  });

  const handleSubmit = (data: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
    githubUrls?: { label: string; url: string }[];
  }) => {
    if (editingItem) {
      updateMut.mutate({ id: editingItem.id, data });
    } else {
      createMut.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      const project = projects.find((p) => p.id === id);
      if (project && project.image) {
        const oldFileName = project.image.split("/").pop();
        if (oldFileName) {
          deleteFile(oldFileName);
        }
      }
      deleteMut.mutate(id);
    }
  };

  const reset = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <>
      <Header
        title="Projects"
        count={projects.length}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel="Add Project"
      />

      {showForm && (
        <ProjectForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
        />
      )}

      {projects.length === 0 ? (
        <EmptyState label="Project" onClick={() => setShowForm(true)} />
      ) : (
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              onEdit={() => {
                setEditingItem(project);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(project.id)}
            >
              {project.image && (
                <div className="mb-4 aspect-[16/10] w-full overflow-hidden border border-rule bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
              <p className="mb-4 line-clamp-2 text-sm text-ink-2">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span key={i} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
