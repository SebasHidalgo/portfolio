"use client";

import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { ArrowLeft, ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import { PROFILE } from "@/lib/profile";

export default function LoginPage() {
  const { signOut } = useClerk();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center bg-signal text-sm font-extrabold text-ink">
            {PROFILE.initials}
          </span>
          <p className="label">Portfolio admin · Sign in</p>
        </div>

        <div className="sheet border-ink p-8">
          <SignedIn>
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">You are signed in</h1>
              <p className="text-sm text-ink-2">
                Continue to the admin panel or sign out of this session.
              </p>

              <Link href="/admin" className="btn btn-primary mt-2">
                Admin panel <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => signOut({ redirectUrl: "/auth/login" })}
                className="btn btn-secondary"
              >
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">Restricted area</h1>
              <p className="text-sm text-ink-2">
                This section is private and accessible only to invited users.
              </p>

              <SignInButton mode="modal" forceRedirectUrl="/admin/projects">
                <button type="button" className="btn btn-primary mt-2">
                  Admin sign in <ArrowRight size={16} aria-hidden="true" />
                </button>
              </SignInButton>

              <Link href="/" className="btn btn-secondary">
                <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
