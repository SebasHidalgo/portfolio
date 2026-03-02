"use client";

import { useUser } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminFloatingButton() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <button
      onClick={() => router.push("/admin")}
      className="fixed bottom-6 right-6 z-30 bg-linear-to-br from-primary to-secondary text-white font-semibold px-3 py-3 
      rounded-full shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-xl transition-all duration-200"
    >
      <Settings />
    </button>
  );
}
