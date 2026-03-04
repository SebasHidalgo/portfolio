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

const accent = "#5050f7";

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
        accent={accent}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel="Add Experience"
      />

      {showForm && (
        <ExperienceForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
          accent={accent}
        />
      )}

      {experiences.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Experience"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              title={exp.position}
              accent={accent}
              onEdit={() => {
                setEditingItem(exp);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(exp.id)}
            >
              <p className="text-sm text-gray-400 mb-2">
                {exp.company} • {exp.ubication}
              </p>

              <p className="text-xs text-gray-500 mb-3">
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {new Date(exp.endDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
