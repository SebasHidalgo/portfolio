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

const accent = "#00f2ff";

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
      create: "Proyecto creado correctamente!",
      update: "Proyecto actualizado correctamente!",
      delete: "Proyecto eliminado correctamente!",
    },
  });

  const handleSubmit = (data: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
  }) => {
    if (editingItem) {
      updateMut.mutate({ id: editingItem.id, data });
    } else {
      createMut.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
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
        accent={accent}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel="Agregar Proyecto"
      />

      {showForm && (
        <ProjectForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
          accent={accent}
        />
      )}

      {projects.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Project"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              accent={accent}
              onEdit={() => {
                setEditingItem(project);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(project.id)}
            >
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                    }}
                  >
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
