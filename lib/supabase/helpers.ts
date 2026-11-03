import toast from "react-hot-toast";
import { createAuthBrowserClient } from "./auth/browser";
import { createProjectImageUpload, deleteProjectImage } from "./storage";
import { PROJECT_IMAGES_BUCKET, validateImage } from "./imageRules";

export async function uploadProjectImage(file: File): Promise<string> {
    const invalid = validateImage(file);
    if (invalid) throw new Error(invalid);

    const ticket = await createProjectImageUpload({ type: file.type, size: file.size });
    if (!ticket.ok) throw new Error(ticket.error);

    const { error } = await createAuthBrowserClient().storage
        .from(PROJECT_IMAGES_BUCKET)
        .uploadToSignedUrl(ticket.path, ticket.token, file, { contentType: file.type });
    if (error) throw new Error("Error uploading image");

    return ticket.publicUrl;
}

export function removeProjectImage(imageUrl: string) {
    deleteProjectImage(imageUrl).catch((err: unknown) => {
        console.error("Error deleting image:", err);
        toast.error("The image could not be removed from storage");
    });
}
