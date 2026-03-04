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
    color: string;
    achievements: string[];
    startDate: Date;
    endDate: Date;
  }) => void;
  isPending: boolean;
  accent: string;
};

const EMPTY = {
  company: "",
  position: "",
  ubication: "",
  color: "#5050f7",
  achievements: "",
  startDate: "",
  endDate: "",
};

export function ExperienceForm({
  editingItem,
  onSubmit,
  isPending,
  accent,
}: Props) {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    if (editingItem) {
      setData({
        company: editingItem.company,
        position: editingItem.position,
        ubication: editingItem.ubication,
        color: editingItem.color,
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
      color: data.color,
      achievements: data.achievements.split("\n").filter(Boolean),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit}
      isPending={isPending}
      accent={accent}
      isEditing={!!editingItem}
      title="Experience"
    >
      <div>
        <Label htmlFor="company" accent={accent}>
          Company *
        </Label>
        <input
          id="company"
          className="adm-input"
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
          required
          placeholder="e.g. Google, Freelance, Personal Startup"
        />
      </div>

      <div>
        <Label htmlFor="position" accent={accent}>
          Position *
        </Label>
        <input
          id="position"
          className="adm-input"
          value={data.position}
          onChange={(e) => setData({ ...data, position: e.target.value })}
          required
          placeholder="e.g. Senior Frontend Developer"
        />
      </div>

      <div>
        <Label htmlFor="ubication" accent={accent}>
          Location *
        </Label>
        <input
          id="ubication"
          className="adm-input"
          value={data.ubication}
          onChange={(e) => setData({ ...data, ubication: e.target.value })}
          required
          placeholder="e.g. Remote • New York, US"
        />
      </div>

      <div>
        <Label htmlFor="color" accent={accent}>
          Color Tag
        </Label>
        <input
          id="color"
          type="color"
          className="adm-input h-[46px] cursor-pointer"
          value={data.color}
          onChange={(e) => setData({ ...data, color: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="startDate" accent={accent}>
          Start Date *
        </Label>
        <input
          id="startDate"
          type="date"
          className="adm-input"
          value={data.startDate}
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
          required
          placeholder="Select start date"
        />
      </div>

      <div>
        <Label htmlFor="endDate" accent={accent}>
          End Date *
        </Label>
        <input
          id="endDate"
          type="date"
          className="adm-input"
          value={data.endDate}
          onChange={(e) => setData({ ...data, endDate: e.target.value })}
          required
          placeholder="Select end date"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="achievements" accent={accent}>
          Achievements (one per line) *
        </Label>
        <textarea
          id="achievements"
          className="adm-input resize-y"
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
