"use client";

import { useState } from "react";
import { Experience } from "@/types";
import { EmptyState, Header, Card } from "@/app/admin/components";
import { ExperienceForm } from "./ExperienceForm";
import { useCrud } from "@/app/admin/hooks/useCrud";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/database/tables/experience";

export default function ExperienceClient({
  initialExperiences,
}: {
  initialExperiences: Experience[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);

  const {
    data: experiences,
    createMut,
    updateMut,
    deleteMut,
  } = useCrud<Experience>({
    queryKey: ["experience"],
    getFn: getExperiences,
    createFn: createExperience,
    updateFn: updateExperience,
    deleteFn: deleteExperience,
    initialData: initialExperiences,
    successMessages: {
      create: "Experience created successfully!",
      update: "Experience updated successfully!",
      delete: "Experience deleted successfully!",
    },
  });

  const handleSubmit = (data: {
    company: string;
    position: string;
    ubication: string;
    color: string;
    achievements: string[];
    startDate: Date;
    endDate: Date;
  }) => {
    if (editingItem) {
      updateMut.mutate({ id: editingItem.id, data });
    } else {
      createMut.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this experience?")) {
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
        title="Experience"
        count={experiences.length}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel="Add Experience"
      />

      {showForm && (
        <ExperienceForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
        />
      )}

      {experiences.length === 0 ? (
        <EmptyState label="Experience" onClick={() => setShowForm(true)} />
      ) : (
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              title={exp.position}
              onEdit={() => {
                setEditingItem(exp);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(exp.id)}
            >
              <p className="mb-2 flex items-center gap-2 text-sm text-ink-2">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 border border-ink/20"
                  style={{ background: exp.color }}
                />
                {exp.company} · {exp.ubication}
              </p>

              <p className="font-mono text-xs text-ink-2">
                {new Date(exp.startDate).toLocaleDateString()} –{" "}
                {new Date(exp.endDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
