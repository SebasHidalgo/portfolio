"use client";

import { useState } from "react";
import { Skill, SkillCategory } from "@/types";
import { Header, Card, EmptyState } from "@/app/admin/components";
import { SkillsForm } from "./SkillsForm";
import { SkillsTabs } from "./SkillsTabs";
import { useCrud } from "@/app/admin/hooks/useCrud";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/lib/database/tables/skills";

export default function SkillsClient({
  initialSkills,
}: {
  initialSkills: Skill[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<SkillCategory>("Languages");
  const [editingItem, setEditingItem] = useState<Skill | null>(null);

  const {
    data: skills,
    createMut,
    updateMut,
    deleteMut,
  } = useCrud<Skill>({
    queryKey: ["skills"],
    getFn: getSkills,
    createFn: createSkill,
    updateFn: updateSkill,
    deleteFn: deleteSkill,
    initialData: initialSkills,
    successMessages: {
      create: "Skill created successfully!",
      update: "Skill updated successfully!",
      delete: "Skill deleted successfully!",
    },
  });

  const handleSubmit = (data: {
    name: string;
    category: Skill["category"];
  }) => {
    if (editingItem) {
      updateMut.mutate({ id: editingItem.id, data });
    } else {
      createMut.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this skill?")) {
      deleteMut.mutate(id);
    }
  };

  const reset = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  // Filter skills by active tab
  const filteredSkills = skills.filter((s) => s.category === activeTab);

  return (
    <>
      <Header
        title="Skills"
        count={skills.length}
        showForm={showForm}
        toggleForm={() => (showForm ? reset() : setShowForm(true))}
        addLabel="Add Skill"
      />

      {skills.length > 0 && (
        <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {showForm && (
        <SkillsForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          isPending={createMut.isPending || updateMut.isPending}
        />
      )}

      {filteredSkills.length === 0 ? (
        <EmptyState label="Skill" onClick={() => setShowForm(true)} />
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.id}
              title={skill.name}
              onEdit={() => {
                setEditingItem(skill);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(skill.id)}
            >
              <span className="label">{skill.category}</span>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
