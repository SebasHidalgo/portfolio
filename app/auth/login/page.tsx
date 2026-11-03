import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROFILE } from "@/lib/profile";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Portfolio",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-5 py-12">
      <main className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center bg-signal text-sm font-extrabold text-ink">
            {PROFILE.initials}
          </span>
          <p className="label">Admin panel · Sign in</p>
        </div>

        <div className="sheet border-ink p-8">
          <h1 className="text-xl font-bold">Restricted area</h1>
          <p className="mt-2 mb-6 text-sm text-ink-2">
            This area is private. Enter the admin email and we&apos;ll send you
            a one-time sign-in code.
          </p>

          <LoginForm />

          <Link href="/" className="btn btn-secondary mt-4 w-full">
            <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}
