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
import { Skill, SkillCategory } from "@/types";

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
];

// Color per category for the card's left border accent
const CATEGORY_COLOR: Record<SkillCategory, string> = {
  Languages: "#4f8ef7",
  Frontend: "#ffb703",
  Backend: "#a855f7",
  Database: "#22d3ee",
  "DevOps & Tools": "#bc13fe",
};

type SkillForm = {
  name: string;
  category: SkillCategory;
};

const EMPTY_SKILL: SkillForm = {
  name: "",
  category: "Languages",
};

const accent = "#bc13fe";
const glow = "rgba(188,19,254,0.35)";

export default function SkillsClient({
  initialSkills,
}: {
  initialSkills: Skill[];
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [skillData, setSkillData] = useState<SkillForm>({ ...EMPTY_SKILL });
  const [activeTab, setActiveTab] = useState<SkillCategory>("Languages");

  const { data: skills = initialSkills } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(),
    initialData: initialSkills,
  });

  const createMut = useMutation({
    mutationFn: (data: SkillForm) => createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill creada correctamente!");
      resetForm();
    },
    onError: () => toast.error("Error al crear la skill"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SkillForm }) =>
      updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill actualizada correctamente!");
      resetForm();
    },
    onError: () => toast.error("Error al actualizar la skill"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill eliminada correctamente!");
    },
    onError: () => toast.error("Error al eliminar la skill"),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setSkillData({ ...EMPTY_SKILL });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMut.mutate({ id: editingId, data: skillData });
    } else {
      createMut.mutate(skillData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar esta skill?")) deleteMut.mutate(id);
  };

  const startEdit = (item: Skill) => {
    setEditingId(item.id);
    setShowForm(true);
    setSkillData({
      name: item.name,
      category: (CATEGORIES.includes(item.category as SkillCategory)
        ? item.category
        : "Frontend") as SkillCategory,
    });
  };

  // Filter skills by active tab
  const filteredSkills = skills.filter((s) => s.category === activeTab);

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
          {showForm ? "Cancelar" : "Agregar Skill"}
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
              {editingId ? "Editar Skill" : "Nueva Skill"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Skill Name */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Nombre de la skill *
                  </label>

                  <input
                    className="adm-input adm-input-purple"
                    value={skillData.name}
                    onChange={(e) =>
                      setSkillData({ ...skillData, name: e.target.value })
                    }
                    placeholder="ej. TypeScript"
                    required
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label
                    className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: accent }}
                  >
                    Categoría *
                  </label>

                  <select
                    className="adm-input adm-input-purple"
                    value={skillData.category}
                    onChange={(e) =>
                      setSkillData({
                        ...skillData,
                        category: e.target.value as SkillCategory,
                      })
                    }
                    required
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  className="w-full py-3 rounded-lg font-bold text-sm text-white transition disabled:opacity-50"
                  style={{ background: accent }}
                >
                  {createMut.isPending || updateMut.isPending
                    ? "Guardando..."
                    : "Guardar Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category filter tabs */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab;
            const color = CATEGORY_COLOR[tab as SkillCategory];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] border transition-all duration-200"
                style={{
                  borderColor: isActive ? color : "rgba(255,255,255,0.1)",
                  background: isActive ? `${color}20` : "transparent",
                  color: isActive ? color : "rgba(255,255,255,0.45)",
                  boxShadow: isActive ? `0 0 12px ${color}40` : "none",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}

      {/* Cards */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          accent={accent}
          label="Skill"
          onClick={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {filteredSkills.map((skill) => {
            const cardColor =
              CATEGORY_COLOR[skill.category as SkillCategory] ?? accent;
            return (
              <div
                key={skill.id}
                className="adm-card flex flex-col gap-2 px-5 py-4"
                style={{ borderLeft: `3px solid ${cardColor}` }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-[15px] font-semibold text-white">
                    {skill.name}
                  </h3>

                  <ActionButtons
                    onEdit={() => startEdit(skill)}
                    onDelete={() => handleDelete(skill.id)}
                    editColor={cardColor}
                  />
                </div>

                {/* Category badge */}
                <span
                  className="self-start px-2.5 py-[3px] rounded-full text-[10px] font-bold uppercase tracking-widest border"
                  style={{
                    background: `${cardColor}15`,
                    borderColor: `${cardColor}35`,
                    color: cardColor,
                  }}
                >
                  {skill.category}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
