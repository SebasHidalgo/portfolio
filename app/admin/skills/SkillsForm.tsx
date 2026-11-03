"use client";

import { useState, useEffect } from "react";
import { Skill, SkillCategory } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";

type Props = {
  editingItem: Skill | null;
  onSubmit: (data: { name: string; category: SkillCategory }) => void;
  isPending: boolean;
};

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
];

const EMPTY = {
  name: "",
  category: "Languages" as SkillCategory,
};

export function SkillsForm({ editingItem, onSubmit, isPending }: Props) {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    if (editingItem) {
      setData({
        name: editingItem.name,
        category: editingItem.category as SkillCategory,
      });
    } else {
      setData(EMPTY);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <FormLayout
      onSubmit={handleSubmit}
      isPending={isPending}
      isEditing={!!editingItem}
      title="Skill"
    >
      <div>
        <Label htmlFor="name">Skill Name *</Label>
        <input
          id="name"
          className="input"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="e.g. TypeScript"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category *</Label>
        <select
          id="category"
          className="input"
          value={data.category}
          onChange={(e) =>
            setData({
              ...data,
              category: e.target.value as SkillCategory,
            })
          }
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </FormLayout>
  );
}
