"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/database/tables/experience";
import { ActionButtons, EmptyState } from "@/app/admin/components/ui";
import { Plus, X } from "lucide-react";
import { Experience } from "@/types";

type ExperiencePayload = {
  company: string;
  position: string;
  ubication: string;
  color: string;
  achievements: string[];
  startDate: Date;
  endDate: Date;
};

const EMPTY_EXP = {
  company: "",
  position: "",
  ubication: "",
  color: "#5050f7",
  achievements: "",
  startDate: "",
  endDate: "",
};

const accent = "#5050f7";
const glow = "rgba(80,80,247,0.35)";

export default function ExperienceClient({
  initialExperiences,
}: {
  initialExperiences: Experience[];
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expData, setExpData] = useState({ ...EMPTY_EXP });

  const { data: experiences = initialExperiences } = useQuery({
    queryKey: ["experience"],
    queryFn: () => getExperiences(),
    initialData: initialExperiences,
  });

  const createMut = useMutation({
    mutationFn: (data: ExperiencePayload) => createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience created successfully!");
      resetForm();
    },
    onError: () => toast.error("Error creating experience"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExperiencePayload }) =>
      updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience updated successfully!");
      resetForm();
    },
    onError: () => toast.error("Error updating experience"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience deleted successfully!");
    },
    onError: () => toast.error("Error deleting experience"),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setExpData({ ...EMPTY_EXP });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      company: expData.company,
      position: expData.position,
      ubication: expData.ubication,
      color: expData.color,
      achievements: expData.achievements.split("\n").filter(Boolean),
      startDate: new Date(expData.startDate),
      endDate: new Date(expData.endDate),
    };
    if (editingId) {
      updateMut.mutate({ id: editingId, data: payload });
    } else {
      createMut.mutate(payload);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this experience?")) deleteMut.mutate(id);
  };

  const startEdit = (item: Experience) => {
    setEditingId(item.id);
    setShowForm(true);
    setExpData({
      company: item.company,
      position: item.position,
      ubication: item.ubication,
      color: item.color,
      achievements: item.achievements.join("\n"),
      startDate: new Date(item.startDate).toISOString().slice(0, 10),
      endDate: new Date(item.endDate).toISOString().slice(0, 10),
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
            // {String(experiences.length).padStart(2, "00")} items
          </p>

          <h1 className="text-[30px] font-extrabold text-white leading-none">
            Experience
          </h1>
        </div>

        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200
        ${showForm ? "bg-white/10 text-gray-400" : "text-white"}
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
          {showForm ? "Cancel" : "Add Experience"}
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
              {editingId ? "Edit Experience" : "New Experience"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Company */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Company *
                  </label>
                  <input
                    className="adm-input adm-input-indigo"
                    value={expData.company}
                    onChange={(e) =>
                      setExpData({ ...expData, company: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Position *
                  </label>
                  <input
                    className="adm-input adm-input-indigo"
                    value={expData.position}
                    onChange={(e) =>
                      setExpData({ ...expData, position: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Location *
                  </label>
                  <input
                    className="adm-input adm-input-indigo"
                    value={expData.ubication}
                    onChange={(e) =>
                      setExpData({ ...expData, ubication: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Color Tag */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Color Tag
                  </label>
                  <input
                    type="color"
                    className="adm-input h-[46px] px-3 py-1.5 cursor-pointer"
                    value={expData.color}
                    onChange={(e) =>
                      setExpData({ ...expData, color: e.target.value })
                    }
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="adm-input adm-input-indigo"
                    value={expData.startDate}
                    onChange={(e) =>
                      setExpData({ ...expData, startDate: e.target.value })
                    }
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="adm-input adm-input-indigo"
                    value={expData.endDate}
                    onChange={(e) =>
                      setExpData({ ...expData, endDate: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Achievements */}
                <div className="md:col-span-2">
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Achievements (one per line) *
                  </label>
                  <textarea
                    className="adm-input adm-input-indigo resize-y"
                    rows={4}
                    value={expData.achievements}
                    onChange={(e) =>
                      setExpData({ ...expData, achievements: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  className="w-full py-3 rounded-lg font-bold text-sm text-white transition disabled:opacity-50"
                  style={{ background: accent }}
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards */}
      {experiences.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Experience"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="adm-card"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{exp.position}</h3>

                <ActionButtons
                  onEdit={() => startEdit(exp)}
                  onDelete={() => handleDelete(exp.id)}
                  editColor={accent}
                />
              </div>

              <p className="text-sm text-gray-400 mb-2">
                {exp.company} • {exp.ubication}
              </p>

              <p className="text-xs text-gray-500 mb-4">
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {new Date(exp.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
