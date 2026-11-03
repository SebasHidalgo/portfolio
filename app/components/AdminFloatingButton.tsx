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
      type="button"
      onClick={() => router.push("/admin")}
      aria-label="Open admin dashboard"
      className="fixed bottom-6 right-6 z-30 flex size-12 items-center justify-center border border-ink bg-ink text-paper shadow-sheet transition-colors hover:bg-signal-ink hover:border-signal-ink"
    >
      <Settings size={20} aria-hidden="true" />
    </button>
  );
}
