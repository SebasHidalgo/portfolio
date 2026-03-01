"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/lib/database/tables/education";
import { ActionButtons, EmptyState } from "@/app/admin/components/ui";

const EMPTY_EDU = {
  degree: "",
  institution: "",
  ubication: "",
  startDate: "",
  endDate: "",
};

export default function EducationClient({
  initialEducations,
}: {
  initialEducations: any[];
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [eduData, setEduData] = useState({ ...EMPTY_EDU });

  const { data: educations = initialEducations } = useQuery({
    queryKey: ["education"],
    queryFn: () => getEducations(),
    initialData: initialEducations,
  });

  const createMut = useMutation({
    mutationFn: (data: any) => createEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education created successfully!");
      resetForm();
    },
    onError: () => toast.error("Error creating education"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEducation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education updated successfully!");
      resetForm();
    },
    onError: () => toast.error("Error updating education"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education deleted successfully!");
    },
    onError: () => toast.error("Error deleting education"),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setEduData({ ...EMPTY_EDU });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      degree: eduData.degree,
      institution: eduData.institution,
      ubication: eduData.ubication,
      startDate: new Date(eduData.startDate),
      endDate: new Date(eduData.endDate),
    };

    if (editingId) {
      updateMut.mutate({ id: editingId, data: payload });
    } else {
      createMut.mutate(payload);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this education entry?")) deleteMut.mutate(id);
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setShowForm(true);
    setEduData({
      degree: item.degree,
      institution: item.institution,
      ubication: item.ubication,
      startDate: new Date(item.startDate).toISOString().slice(0, 10),
      endDate: new Date(item.endDate).toISOString().slice(0, 10),
    });
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow-400 mb-1.5">
            // {String(educations.length).padStart(2, "0")} items
          </p>
          <h1 className="text-3xl font-extrabold text-white">Education</h1>
        </div>

        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200
            ${
              showForm
                ? "bg-white/10 text-gray-400"
                : "bg-yellow-400 text-black shadow-[0_0_24px_rgba(255,183,3,0.35)] hover:opacity-90"
            }`}
        >
          <span className="text-lg">{showForm ? "✕" : "+"}</span>
          {showForm ? "Cancel" : "Add Education"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl overflow-hidden mb-10 bg-white/5 backdrop-blur-md border border-white/10">
          <div className="h-[3px] bg-linear-to-r from-yellow-400 to-yellow-400/30" />

          <div className="p-8">
            <h2 className="text-lg font-bold text-white mb-6">
              {editingId ? "Edit Education" : "New Education"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Institution", key: "institution" },
                  { label: "Degree", key: "degree" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow-400 mb-1.5">
                      {label} *
                    </label>
                    <input
                      value={(eduData as any)[key]}
                      onChange={(e) =>
                        setEduData({ ...eduData, [key]: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-yellow-400/20 
                      focus:outline-none focus:border-yellow-400 text-white text-sm transition"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow-400 mb-1.5">
                    Location *
                  </label>
                  <input
                    value={eduData.ubication}
                    onChange={(e) =>
                      setEduData({ ...eduData, ubication: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-yellow-400/20 
                    focus:outline-none focus:border-yellow-400 text-white text-sm transition"
                  />
                </div>

                {["startDate", "endDate"].map((field) => (
                  <div key={field}>
                    <label className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow-400 mb-1.5">
                      {field === "startDate" ? "Start Date" : "End Date"} *
                    </label>
                    <input
                      type="date"
                      value={(eduData as any)[field]}
                      onChange={(e) =>
                        setEduData({ ...eduData, [field]: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-yellow-400/20 
                      focus:outline-none focus:border-yellow-400 text-white text-sm transition"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  className="w-full py-3 rounded-lg bg-yellow-400 text-black font-bold text-sm 
                  hover:opacity-90 transition disabled:opacity-50"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards */}
      {educations.length === 0 ? (
        <EmptyState
          accent="#ffb703"
          label="Education"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {educations.map((edu: any) => (
            <div
              key={edu.id}
              className="adm-card"
              style={{ borderLeft: `4px solid ${edu.color || "#ffb703"}` }}
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                <ActionButtons
                  onEdit={() => startEdit(edu)}
                  onDelete={() => handleDelete(edu.id)}
                  editColor="#ffb703"
                />
              </div>

              <p className="text-sm text-gray-400 mb-2">
                {edu.institution} • {edu.ubication}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(edu.startDate).toLocaleDateString()} -{" "}
                {new Date(edu.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
