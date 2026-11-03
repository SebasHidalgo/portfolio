"use client";

import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { createAuthBrowserClient } from "@/lib/supabase/auth/browser";

export default function AdminFloatingButton() {
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createAuthBrowserClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!signedIn) return null;

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
