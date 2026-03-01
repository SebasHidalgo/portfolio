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

const EMPTY_EXP = {
  company: "",
  position: "",
  ubication: "",
  color: "#5050f7",
  achievements: "",
  techStack: "",
  startDate: "",
  endDate: "",
};

const accent = "#5050f7";
const glow = "rgba(80,80,247,0.35)";

export default function ExperienceClient({
  initialExperiences,
}: {
  initialExperiences: any[];
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
    mutationFn: (data: any) => createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience created successfully!");
      resetForm();
    },
    onError: () => toast.error("Error creating experience"),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
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
      techStack: expData.techStack
        ? expData.techStack.split(",").map((s) => s.trim())
        : [],
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

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setShowForm(true);
    setExpData({
      company: item.company,
      position: item.position,
      ubication: item.ubication,
      color: item.color,
      achievements: item.achievements.join("\n"),
      techStack: item.techStack.join(", "),
      startDate: new Date(item.startDate).toISOString().slice(0, 10),
      endDate: new Date(item.endDate).toISOString().slice(0, 10),
    });
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
            // {String(experiences.length).padStart(2, "00")} items
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
            Experience
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
          {showForm ? "Cancel" : "Add Experience"}
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
              {editingId ? "Edit Experience" : "New Experience"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
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
                    Color Tag
                  </label>
                  <input
                    type="color"
                    className="adm-input"
                    style={{
                      height: 46,
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                    value={expData.color}
                    onChange={(e) =>
                      setExpData({ ...expData, color: e.target.value })
                    }
                  />
                </div>
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
                <div style={{ gridColumn: "1/-1" }}>
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
                    Achievements (one per line) *
                  </label>
                  <textarea
                    className="adm-input adm-input-indigo"
                    rows={4}
                    value={expData.achievements}
                    onChange={(e) =>
                      setExpData({ ...expData, achievements: e.target.value })
                    }
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
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
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    className="adm-input adm-input-indigo"
                    value={expData.techStack}
                    onChange={(e) =>
                      setExpData({ ...expData, techStack: e.target.value })
                    }
                  />
                </div>
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
            gap: 24,
          }}
        >
          {experiences.map((exp: any) => (
            <div
              key={exp.id}
              className="adm-card"
              style={{ borderLeft: `4px solid ${exp.color || accent}` }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {exp.position}
                </h3>
                <ActionButtons
                  onEdit={() => startEdit(exp)}
                  onDelete={() => handleDelete(exp.id)}
                  editColor={accent}
                />
              </div>
              <p style={{ color: "#aaa", fontSize: 14, marginBottom: 8 }}>
                {exp.company} &bull; {exp.ubication}
              </p>
              <p style={{ color: "#666", fontSize: 12, marginBottom: 16 }}>
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {new Date(exp.endDate).toLocaleDateString()}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {exp.techStack.map((t: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "#ccc",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: 10,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
