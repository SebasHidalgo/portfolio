import "server-only";
import type { User } from "@supabase/supabase-js";
import { createAuthServerClient } from "@/lib/supabase/auth/server";
import { isAdminEmail } from "./adminEmail";

export async function requireAdmin(): Promise<string> {
  let user: User | null = null;

  try {
    const supabase = await createAuthServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("Admin check failed:", error);
  }

  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }
  return user.id;
}
