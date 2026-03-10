"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

type Props = {
  editingItem: Project | null;
  onSubmit: (data: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
    githubUrls?: { label: string; url: string }[];
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
  githubUrls: [] as { label: string; url: string }[],
};

export function ProjectForm({
  editingItem,
  onSubmit,
  isPending,
  accent,
}: Props) {
  const [data, setData] = useState(EMPTY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasMultipleRepos, setHasMultipleRepos] = useState(false);

  const handleAddGithubUrl = () => {
    setData({
      ...data,
      githubUrls: [...(data.githubUrls || []), { label: "", url: "" }],
    });
  };

  const handleUpdateGithubUrl = (
    index: number,
    field: "label" | "url",
    value: string,
  ) => {
    const newUrls = [...data.githubUrls];
    newUrls[index][field] = value;
    setData({ ...data, githubUrls: newUrls });
  };

  const handleRemoveGithubUrl = (index: number) => {
    const newUrls = [...data.githubUrls];
    newUrls.splice(index, 1);
    setData({ ...data, githubUrls: newUrls });
  };

  useEffect(() => {
    if (editingItem) {
      const urlsArray =
        editingItem.githubUrls && Array.isArray(editingItem.githubUrls)
          ? editingItem.githubUrls
          : [];

      setData({
        title: editingItem.title,
        description: editingItem.description,
        image: editingItem.image,
        techStack: editingItem.techStack.join(", "),
        demoUrl: editingItem.demoUrl || "",
        githubUrl: editingItem.githubUrl || "",
        githubUrls: urlsArray,
      });
      setHasMultipleRepos(urlsArray.length > 0);
      setSelectedFile(null);
    } else {
      setData(EMPTY);
      setHasMultipleRepos(false);
      setSelectedFile(null);
    }
  }, [editingItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = data.image;

    if (selectedFile) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      setIsUploading(false);

      if (!res.ok) {
        toast.error("Error uploading image");
        return;
      }

      const result = await res.json();
      imageUrl = result.url;

      if (editingItem && editingItem.image) {
        const oldFileName = editingItem.image.split("/").pop();

        if (oldFileName) {
          await fetch("/api/images/delete", {
            method: "POST",
            body: JSON.stringify({ path: oldFileName }),
          });
        }
      }
    }

    onSubmit({
      ...data,
      githubUrl: hasMultipleRepos ? "" : data.githubUrl,
      githubUrls:
        hasMultipleRepos && data.githubUrls
          ? data.githubUrls.filter((l) => l.label.trim() && l.url.trim())
          : [],
      image: imageUrl,
      techStack: data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit}
      isPending={isPending || isUploading}
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
          Image *
        </Label>
        <div className="flex gap-4 items-start pb-2">
          <div className="flex-1">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="adm-input w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              required={!editingItem && !data.image}
            />
            {(data.image || selectedFile) && (
              <p className="text-xs text-gray-500 mt-2">
                {selectedFile
                  ? `Seleccionado: ${selectedFile.name}`
                  : `(Imagen actual guardada)`}
              </p>
            )}
          </div>
          {(selectedFile || data.image) && (
            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) : data.image
                }
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
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

      <div className="md:col-span-2">
        <label className="flex items-center gap-3 text-sm text-gray-300 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={hasMultipleRepos}
            onChange={(e) => setHasMultipleRepos(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 focus:ring-1"
            style={{ accentColor: accent }}
          />
          Does the project have multiple repositories (e.g. Frontend / Backend)?
        </label>
      </div>

      {!hasMultipleRepos ? (
        <div className="md:col-span-2">
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
      ) : (
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="githubUrls" accent={accent}>
              Repositories
            </Label>
            <button
              type="button"
              onClick={handleAddGithubUrl}
              className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded hover:bg-white/10 flex items-center gap-1.5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Repository
            </button>
          </div>

          {data.githubUrls && data.githubUrls.length > 0 && (
            <div className="space-y-3 mt-3">
              {data.githubUrls.map((link, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
                    <input
                      className="adm-input"
                      value={link.label}
                      onChange={(e) =>
                        handleUpdateGithubUrl(idx, "label", e.target.value)
                      }
                      placeholder="Label (e.g. Frontend)"
                      required
                    />
                    <input
                      className="adm-input"
                      value={link.url}
                      onChange={(e) =>
                        handleUpdateGithubUrl(idx, "url", e.target.value)
                      }
                      placeholder="URL of the repository"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveGithubUrl(idx)}
                    className="p-3 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 transition-colors border border-red-500/20 h-[42px]"
                    title="Delete URL"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
