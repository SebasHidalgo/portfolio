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
        title="Education"
        count={educations.length}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel="Add Education"
      />

      {showForm && (
        <EducationForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
        />
      )}

      {educations.length === 0 ? (
        <EmptyState label="Education" onClick={() => setShowForm(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {educations.map((edu) => (
            <Card
              key={edu.id}
              title={edu.degree}
              onEdit={() => {
                setEditingItem(edu);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(edu.id)}
            >
              <p className="mb-2 text-sm text-ink-2">
                {edu.institution} · {edu.ubication}
              </p>

              <p className="font-mono text-xs text-ink-2">
                {new Date(edu.startDate).toLocaleDateString()} –{" "}
                {new Date(edu.endDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
