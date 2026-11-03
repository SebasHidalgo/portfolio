import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAuthConfig } from "./config";

export function createAuthBrowserClient() {
  const { url, anonKey } = getSupabaseAuthConfig();
  return createBrowserClient(url, anonKey);
}
