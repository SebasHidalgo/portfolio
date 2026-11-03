"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { deleteFile, uploadFile } from "@/lib/supabase/helpers";

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
    displayOrder: number;
  }) => void;
  isPending: boolean;
};

const EMPTY = {
  title: "",
  description: "",
  image: "",
  techStack: "",
  demoUrl: "",
  githubUrl: "",
  githubUrls: [] as { label: string; url: string }[],
  displayOrder: "0",
};

export function ProjectForm({ editingItem, onSubmit, isPending }: Props) {
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
        displayOrder: String(editingItem.displayOrder ?? 0),
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

      const uploadedFile = await uploadFile(selectedFile);
      imageUrl = uploadedFile!;

      setIsUploading(false);

      if (editingItem && editingItem.image) {
        const oldFileName = editingItem.image.split("/").pop();

        if (oldFileName) {
          deleteFile(oldFileName);
        }
      } else if (!imageUrl) {
        toast.error("Please upload an image");
        return;
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
      displayOrder: Math.max(0, Number.parseInt(data.displayOrder, 10) || 0),
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit}
      isPending={isPending || isUploading}
      isEditing={!!editingItem}
      title="Project"
    >
      <div className="md:col-span-2">
        <Label htmlFor="title">Project Title *</Label>
        <input
          id="title"
          className="input"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
          placeholder="e.g. AI SaaS Dashboard"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="description">Description *</Label>
        <textarea
          id="description"
          className="input resize-y"
          rows={3}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
          placeholder="Briefly describe the goal, features, and impact of the project"
        />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="image">Image *</Label>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="input cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              required={!editingItem && !data.image}
            />
            {(data.image || selectedFile) && (
              <p className="mt-2 text-xs text-ink-2">
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : "(Current image saved)"}
              </p>
            )}
          </div>
          {(selectedFile || data.image) && (
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden border border-rule bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) : data.image
                }
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="techStack">Tech Stack (comma separated) *</Label>
        <input
          id="techStack"
          className="input"
          value={data.techStack}
          onChange={(e) => setData({ ...data, techStack: e.target.value })}
          required
          placeholder="e.g. Next.js, TypeScript, Prisma, PostgreSQL"
        />
      </div>

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={hasMultipleRepos}
            onChange={(e) => setHasMultipleRepos(e.target.checked)}
            className="size-4 accent-signal-ink"
          />
          Does the project have multiple repositories (e.g. Frontend / Backend)?
        </label>
      </div>

      {!hasMultipleRepos ? (
        <div className="md:col-span-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <input
            id="githubUrl"
            className="input"
            value={data.githubUrl}
            onChange={(e) => setData({ ...data, githubUrl: e.target.value })}
            placeholder="https://github.com/username/project-name"
          />
        </div>
      ) : (
        <div className="md:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="githubUrls">Repositories</Label>
            <button
              type="button"
              onClick={handleAddGithubUrl}
              className="btn btn-secondary min-h-9 px-3 text-[0.6875rem]"
            >
              <Plus size={14} aria-hidden="true" />
              Add Repository
            </button>
          </div>

          {data.githubUrls && data.githubUrls.length > 0 && (
            <div className="mt-3 space-y-3">
              {data.githubUrls.map((link, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <input
                      className="input"
                      value={link.label}
                      onChange={(e) =>
                        handleUpdateGithubUrl(idx, "label", e.target.value)
                      }
                      placeholder="Label (e.g. Frontend)"
                      aria-label={`Repository ${idx + 1} label`}
                      required
                    />
                    <input
                      className="input"
                      value={link.url}
                      onChange={(e) =>
                        handleUpdateGithubUrl(idx, "url", e.target.value)
                      }
                      placeholder="URL of the repository"
                      aria-label={`Repository ${idx + 1} URL`}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveGithubUrl(idx)}
                    className="btn-icon btn-icon-danger h-[2.875rem] w-[2.875rem]"
                    aria-label="Delete repository"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div>
        <Label htmlFor="demoUrl">Live Demo URL</Label>
        <input
          id="demoUrl"
          className="input"
          value={data.demoUrl}
          onChange={(e) => setData({ ...data, demoUrl: e.target.value })}
          placeholder="https://project-demo.vercel.app"
        />
      </div>

      <div>
        <Label htmlFor="displayOrder">Display Order</Label>
        <input
          id="displayOrder"
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          className="input"
          value={data.displayOrder}
          onChange={(e) => setData({ ...data, displayOrder: e.target.value })}
          aria-describedby="displayOrder-hint"
        />
        <p id="displayOrder-hint" className="mt-2 text-xs text-ink-2">
          Lower numbers appear first. Projects with the same number show
          newest first.
        </p>
      </div>
    </FormLayout>
  );
}
