"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import toast from "react-hot-toast";
import { Project } from "@/types";
import { EmptyState, Header, Card } from "@/app/admin/components";
import { useCrud } from "@/app/admin/hooks/useCrud";
import { ProjectForm } from "./ProjectsForm";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from "@/lib/database/tables/project";
import { removeProjectImage } from "@/lib/supabase/helpers";

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

  const queryClient = useQueryClient();
  const reorderMut = useMutation({
    mutationFn: reorderProjects,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    onError: () => toast.error("Could not reorder projects"),
  });

  const moveProject = (index: number, offset: -1 | 1) => {
    const target = index + offset;
    if (target < 0 || target >= projects.length) return;
    const ids = projects.map((p) => p.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    reorderMut.mutate(ids);
  };

  const handleSubmit = (data: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
    githubUrls?: { label: string; url: string }[];
    displayOrder: number;
  }) => {
    if (editingItem) {
      const previousImage = editingItem.image;
      const imageChanged = Boolean(data.image) && data.image !== previousImage;
      updateMut.mutate(
        { id: editingItem.id, data },
        {
          onSuccess: () => {
            if (imageChanged && previousImage) removeProjectImage(previousImage);
          },
          onError: () => {
            if (imageChanged) removeProjectImage(data.image);
          },
        },
      );
    } else {
      createMut.mutate(data, {
        onError: () => removeProjectImage(data.image),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      const project = projects.find((p) => p.id === id);
      deleteMut.mutate(id, {
        onSuccess: () => {
          if (project?.image) removeProjectImage(project.image);
        },
      });
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
          {projects.map((project, index) => (
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

              <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
                <span className="label">Order {project.displayOrder}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => moveProject(index, -1)}
                    disabled={index === 0 || reorderMut.isPending}
                    aria-label={`Move ${project.title} up`}
                    className="btn-icon"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveProject(index, 1)}
                    disabled={
                      index === projects.length - 1 || reorderMut.isPending
                    }
                    aria-label={`Move ${project.title} down`}
                    className="btn-icon"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
