import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";
import { ADMIN_PATH, LOGIN_PATH, isAdminEmail } from "@/lib/auth/adminEmail";
import { getSupabaseAuthConfig } from "./config";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  let user: User | null = null;

  try {
    const { url, anonKey } = getSupabaseAuthConfig();
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            response.headers.set(key, value),
          );
        },
      },
    });

    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("Supabase session refresh failed:", error);
  }

  const isAdmin = isAdminEmail(user?.email);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ADMIN_PATH) && !isAdmin) {
    return redirectKeepingCookies(request, response, LOGIN_PATH);
  }
  if (pathname === LOGIN_PATH && isAdmin) {
    return redirectKeepingCookies(request, response, ADMIN_PATH);
  }
  return response;
}

function redirectKeepingCookies(
  request: NextRequest,
  from: NextResponse,
  path: string,
) {
  const redirect = NextResponse.redirect(new URL(path, request.url));
  from.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  const cacheControl = from.headers.get("Cache-Control");
  if (cacheControl) redirect.headers.set("Cache-Control", cacheControl);
  return redirect;
}
