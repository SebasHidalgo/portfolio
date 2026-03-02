"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/lib/database/tables/skills";
import { ActionButtons, EmptyState } from "@/app/admin/components/ui";
import { Plus, X } from "lucide-react";

const EMPTY_SKILL = { name: "" };

const accent = "#bc13fe";
const glow = "rgba(188,19,254,0.35)";

export default function SkillsClient({
  initialSkills,
}: {
  initialSkills: any[];
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [skillData, setSkillData] = useState({ ...EMPTY_SKILL });

  const { data: skills = initialSkills } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(),
    initialData: initialSkills,
  });

  const createMut = useMutation({
    mutationFn: (data: any) => createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill created successfully!");
      resetForm();
    },
    onError: () => toast.error("Error creating skill"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated successfully!");
      resetForm();
    },
    onError: () => toast.error("Error updating skill"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted successfully!");
    },
    onError: () => toast.error("Error deleting skill"),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setSkillData({ ...EMPTY_SKILL });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMut.mutate({ id: editingId, data: { name: skillData.name } });
    } else {
      createMut.mutate({ name: skillData.name });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this skill?")) deleteMut.mutate(id);
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setShowForm(true);
    setSkillData({ name: item.name });
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
            // {String(skills.length).padStart(2, "0")} items
          </p>

          <h1 className="text-[30px] font-extrabold text-white leading-none">
            Skills
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
          {showForm ? "Cancel" : "Add Skill"}
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
              {editingId ? "Edit Skill" : "New Skill"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                  style={{ color: accent }}
                >
                  Skill Name *
                </label>

                <input
                  className="adm-input adm-input-purple"
                  value={skillData.name}
                  onChange={(e) => setSkillData({ name: e.target.value })}
                  placeholder="e.g. TypeScript"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  className="w-full py-3 rounded-lg font-bold text-sm text-white transition disabled:opacity-50"
                  style={{ background: accent }}
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards */}
      {skills.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Skill"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {skills.map((skill: any) => (
            <div
              key={skill.id}
              className="adm-card flex justify-between items-center px-5 py-4 border-l-[3px]"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <h3 className="text-[15px] font-semibold text-white">
                {skill.name}
              </h3>

              <ActionButtons
                onEdit={() => startEdit(skill)}
                onDelete={() => handleDelete(skill.id)}
                editColor={accent}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
