export const PROJECT_IMAGES_BUCKET = "projects";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const IMAGE_EXTENSIONS = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
  ["image/gif", "gif"],
]);

export const ACCEPTED_IMAGE_TYPES = [...IMAGE_EXTENSIONS.keys()].join(",");
export const IMAGE_RULES_HINT = "JPG, PNG, WebP, AVIF or GIF, up to 5 MB.";

export function validateImage(file: unknown): string | null {
  if (!file || typeof file !== "object") return "No image selected.";
  const { type, size } = file as { type?: unknown; size?: unknown };
  if (typeof type !== "string" || !IMAGE_EXTENSIONS.has(type)) {
    return "Only JPG, PNG, WebP, AVIF or GIF images are allowed.";
  }
  if (typeof size !== "number" || !Number.isFinite(size) || size <= 0) {
    return "The image file is empty.";
  }
  if (size > MAX_IMAGE_BYTES) return "Images must be 5 MB or smaller.";
  return null;
}

export function getProjectImagePath(imageUrl: unknown): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base || typeof imageUrl !== "string") return null;

  try {
    const url = new URL(imageUrl);
    if (url.origin !== new URL(base).origin) return null;

    const prefix = `/storage/v1/object/public/${PROJECT_IMAGES_BUCKET}/`;
    if (!url.pathname.startsWith(prefix)) return null;

    const path = decodeURIComponent(url.pathname.slice(prefix.length));
    if (!path || path.startsWith("/") || path.split("/").includes("..")) {
      return null;
    }
    return path;
  } catch {
    return null;
  }
}
