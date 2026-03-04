"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";

type Props = {
  editingItem: Project | null;
  onSubmit: (data: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
  }) => void;
  isPending: boolean;
  accent: string;
};

const EMPTY = {
  title: "",
  description: "",
  image: "",
  techStack: "",
  demoUrl: "",
  githubUrl: "",
};

export function ProjectForm({
  editingItem,
  onSubmit,
  isPending,
  accent,
}: Props) {
  const [data, setData] = useState(EMPTY);

  useEffect(() => {
    if (editingItem) {
      setData({
        title: editingItem.title,
        description: editingItem.description,
        image: editingItem.image,
        techStack: editingItem.techStack.join(", "),
        demoUrl: editingItem.demoUrl || "",
        githubUrl: editingItem.githubUrl || "",
      });
    } else {
      setData(EMPTY);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...data,
      techStack: data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit}
      isPending={isPending}
      accent={accent}
      isEditing={!!editingItem}
      title="Project"
    >
      <div className="md:col-span-2">
        <Label htmlFor="title" accent={accent}>
          Project Title *
        </Label>
        <input
          id="title"
          className="adm-input"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
          placeholder="e.g. AI SaaS Dashboard"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="description" accent={accent}>
          Description *
        </Label>
        <textarea
          id="description"
          className="adm-input resize-y"
          rows={3}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
          placeholder="Briefly describe the goal, features, and impact of the project"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="image" accent={accent}>
          Image URL *
        </Label>
        <input
          id="image"
          className="adm-input"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          required
          placeholder="Project Image Preview"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="techStack" accent={accent}>
          Tech Stack (comma separated) *
        </Label>
        <input
          id="techStack"
          className="adm-input"
          value={data.techStack}
          onChange={(e) => setData({ ...data, techStack: e.target.value })}
          required
          placeholder="e.g. Next.js, TypeScript, Prisma, PostgreSQL"
        />
      </div>

      <div>
        <Label htmlFor="githubUrl" accent={accent}>
          GitHub URL
        </Label>
        <input
          id="githubUrl"
          className="adm-input"
          value={data.githubUrl}
          onChange={(e) => setData({ ...data, githubUrl: e.target.value })}
          placeholder="https://github.com/username/project-name"
        />
      </div>

      <div>
        <Label htmlFor="demoUrl" accent={accent}>
          Live Demo URL
        </Label>
        <input
          id="demoUrl"
          className="adm-input"
          value={data.demoUrl}
          onChange={(e) => setData({ ...data, demoUrl: e.target.value })}
          placeholder="https://project-demo.vercel.app"
        />
      </div>
    </FormLayout>
  );
}
