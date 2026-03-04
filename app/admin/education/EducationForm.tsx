"use client";

import { useState, useEffect } from "react";
import { Education } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";

type Props = {
  editingItem: Education | null;
  onSubmit: (data: {
    degree: string;
    institution: string;
    ubication: string;
    startDate: Date;
    endDate: Date;
  }) => void;
  isPending: boolean;
  accent: string;
};

const EMPTY = {
  degree: "",
  institution: "",
  ubication: "",
  startDate: "",
  endDate: "",
};

export function EducationForm({
  editingItem,
  onSubmit,
  isPending,
  accent,
}: Props) {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    if (editingItem) {
      setData({
        degree: editingItem.degree,
        institution: editingItem.institution,
        ubication: editingItem.ubication,
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
      degree: data.degree,
      institution: data.institution,
      ubication: data.ubication,
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
      title="Education"
    >
      <div>
        <Label htmlFor="institution" accent={accent}>
          Institution *
        </Label>
        <input
          id="institution"
          className="adm-input"
          value={data.institution}
          onChange={(e) => setData({ ...data, institution: e.target.value })}
          required
          placeholder="e.g. Stanford University, University of Buenos Aires"
        />
      </div>

      <div>
        <Label htmlFor="degree" accent={accent}>
          Degree *
        </Label>
        <input
          id="degree"
          className="adm-input"
          value={data.degree}
          onChange={(e) => setData({ ...data, degree: e.target.value })}
          required
          placeholder="e.g. Bachelor of Science in Computer Science"
        />
      </div>

      <div className="md:col-span-2">
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
    </FormLayout>
  );
}
