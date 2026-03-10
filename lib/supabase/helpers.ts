import toast from "react-hot-toast";
import { supabaseClient } from "./supabaseClient";

export const deleteFile = (oldFileName: string) => {
    supabaseClient.storage
        .from("projects")
        .remove([oldFileName])
        .catch((err: unknown) =>
            console.error("Error deleting image:", err),
        );
};

export const uploadFile = async (selectedFile: File) => {
    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

    const { data: uploadData, error } = await supabaseClient.storage
        .from("projects")
        .upload(fileName, selectedFile);

    if (error) {
        toast.error("Error uploading image");
        return;
    }

    const { data: { publicUrl } } = supabaseClient.storage.from("projects").getPublicUrl(uploadData.path);

    return publicUrl;
}   