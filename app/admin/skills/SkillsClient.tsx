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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36,
        }}
      >
        <div>
          <p
            style={{
              color: accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            // {String(skills.length).padStart(2, "0")} items
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
            }}
          >
            Skills
          </h1>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 22px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            background: showForm
              ? "rgba(255,255,255,0.07)"
              : `linear-gradient(135deg,${accent},${accent}99)`,
            color: showForm ? "#888" : "#fff",
            boxShadow: showForm ? "none" : `0 0 24px ${glow}`,
            transition: "all 0.2s",
          }}
        >
          <span className="msym" style={{ fontSize: 20 }}>
            {showForm ? "close" : "add"}
          </span>
          {showForm ? "Cancel" : "Add Skill"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          className="adm-glass"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 40,
            position: "relative",
          }}
        >
          <div
            style={{
              height: 3,
              background: `linear-gradient(90deg,${accent},${glow})`,
            }}
          />
          <div style={{ padding: "28px 32px" }}>
            <h2
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 24,
                fontSize: 18,
              }}
            >
              {editingId ? "Edit Skill" : "New Skill"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  style={{
                    color: accent,
                    display: "block",
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    marginBottom: 6,
                  }}
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
              <div style={{ marginTop: 24 }}>
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 10,
                    border: "none",
                    background: accent,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    width: "100%",
                  }}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 16,
          }}
        >
          {skills.map((skill: any) => (
            <div
              key={skill.id}
              className="adm-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderLeft: `3px solid ${accent}`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
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
