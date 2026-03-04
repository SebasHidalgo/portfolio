"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { FormLayout, Label } from "@/app/admin/components";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      setSelectedFile(null);
    } else {
      setData(EMPTY);
      setSelectedFile(null);
    }
  }, [editingItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = data.image;

    if (selectedFile) {
      setIsUploading(true);
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

      const { data: uploadData, error } = await supabase.storage
        .from("projects")
        .upload(fileName, selectedFile);

      setIsUploading(false);

      if (error) {
        toast.error("Error al subir la imagen: " + error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(uploadData.path);

      imageUrl = publicUrl;

      // Eliminar la imagen anterior si existe y es diferente
      if (editingItem && editingItem.image) {
        const oldFileName = editingItem.image.split("/").pop();
        if (oldFileName) {
          supabase.storage
            .from("projects")
            .remove([oldFileName])
            .catch((err) =>
              console.error("Error al eliminar la imagen antigua:", err),
            );
        }
      }
    } else if (!imageUrl) {
      toast.error("Por favor adjunta una imagen o provee una URL");
      return;
    }

    onSubmit({
      ...data,
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
