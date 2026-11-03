"use client";

import { useState, useEffect } from "react";
import { Experience } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";

type Props = {
  editingItem: Experience | null;
  onSubmit: (data: {
    company: string;
    position: string;
    ubication: string;
    achievements: string[];
    startDate: Date;
    endDate: Date;
  }) => void;
  isPending: boolean;
};

const EMPTY = {
  company: "",
  position: "",
  ubication: "",
  achievements: "",
  startDate: "",
  endDate: "",
};

export function ExperienceForm({ editingItem, onSubmit, isPending }: Props) {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    if (editingItem) {
      setData({
        company: editingItem.company,
        position: editingItem.position,
        ubication: editingItem.ubication,
        achievements: editingItem.achievements.join("\n"),
        startDate: new Date(editingItem.startDate).toISOString().slice(0, 10),
        endDate: new Date(editingItem.endDate).toISOString().slice(0, 10),
      });
    } else {
      setData(EMPTY);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      company: data.company,
      position: data.position,
      ubication: data.ubication,
      achievements: data.achievements.split("\n").filter(Boolean),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit}
      isPending={isPending}
      isEditing={!!editingItem}
      title="Experience"
    >
      <div>
        <Label htmlFor="company">Company *</Label>
        <input
          id="company"
          className="input"
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
          required
          placeholder="e.g. Google, Freelance, Personal Startup"
        />
      </div>

      <div>
        <Label htmlFor="position">Position *</Label>
        <input
          id="position"
          className="input"
          value={data.position}
          onChange={(e) => setData({ ...data, position: e.target.value })}
          required
          placeholder="e.g. Senior Frontend Developer"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="ubication">Location *</Label>
        <input
          id="ubication"
          className="input"
          value={data.ubication}
          onChange={(e) => setData({ ...data, ubication: e.target.value })}
          required
          placeholder="e.g. Remote • New York, US"
        />
      </div>

      <div>
        <Label htmlFor="startDate">Start Date *</Label>
        <input
          id="startDate"
          type="date"
          className="input"
          value={data.startDate}
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="endDate">End Date *</Label>
        <input
          id="endDate"
          type="date"
          className="input"
          value={data.endDate}
          onChange={(e) => setData({ ...data, endDate: e.target.value })}
          required
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="achievements">Achievements (one per line) *</Label>
        <textarea
          id="achievements"
          className="input resize-y"
          rows={4}
          value={data.achievements}
          onChange={(e) => setData({ ...data, achievements: e.target.value })}
          required
          placeholder={`Built and maintained scalable web applications
Improved performance by 35%
Led a team of 4 developers`}
        />
      </div>
    </FormLayout>
  );
}
