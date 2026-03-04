"use client";

import { useState } from "react";
import { Education } from "@/types";
import { EmptyState, Header, Card } from "@/app/admin/components";
import { useCrud } from "@/app/admin/hooks/useCrud";
import { EducationForm } from "./EducationForm";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/lib/database/tables/education";

const accent = "#ffb703";

export default function EducationClient({
  initialEducations,
}: {
  initialEducations: Education[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);

  const {
    data: educations,
    createMut,
    updateMut,
    deleteMut,
  } = useCrud<Education>({
    queryKey: ["education"],
    getFn: getEducations,
    createFn: createEducation,
    updateFn: updateEducation,
    deleteFn: deleteEducation,
    initialData: initialEducations,
    successMessages: {
      create: "Education created successfully!",
      update: "Education updated successfully!",
      delete: "Education deleted successfully!",
    },
  });

  const handleSubmit = (data: any) => {
    if (editingItem) {
      updateMut.mutate({ id: editingItem.id, data });
    } else {
      createMut.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this education?")) {
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
        title="Educación"
        count={educations.length}
        accent={accent}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel={"Agregar Educación"}
      />

      {showForm && (
        <EducationForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
          accent={accent}
        />
      )}

      {educations.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Education"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          {educations.map((edu) => (
            <Card
              key={edu.id}
              title={edu.degree}
              onEdit={() => {
                setEditingItem(edu);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(edu.id)}
              accent={accent}
            >
              <p className="text-sm text-gray-400 mb-2">
                {edu.institution} • {edu.ubication}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(edu.startDate).toLocaleDateString()} -{" "}
                {new Date(edu.endDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
