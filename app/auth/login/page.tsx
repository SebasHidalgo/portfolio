"use client";

import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { signOut } = useClerk();

  return (
    <div className="relative min-h-screen bg-[#07080f] flex items-center justify-center overflow-hidden font-sans">
      {/* ── Animated background blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Login Card ── */}
      <div className="relative w-full max-w-md mx-4 z-10">
        {/* Glow border ring */}
        <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-cyan-500/50 via-purple-500/30 to-cyan-500/10 blur-sm" />

        <div className="relative rounded-2xl bg-white/4 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 p-8">
          {/* Sign In Button */}

          <SignedIn>
            <div className="space-y-6">
              <button
                onClick={() => signOut({ redirectUrl: "/auth/login" })}
                className="relative w-full overflow-hidden rounded-lg py-3 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-600 transition-opacity group-hover:opacity-90" />
                {/* Hover glow */}
                <span className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-500 opacity-0 blur-md transition-opacity group-hover:opacity-50" />
                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2">
                  Sign Out
                  <LogOut size={16} />
                </span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/40">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Link
                href="/admin"
                className="inline-flex justify-center items-center gap-2 w-full rounded-lg border border-white/10 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition"
              >
                <ArrowLeft size={16} /> Admin Panel
              </Link>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="text-center space-y-6">
              {/* Message */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">
                  Restricted Area
                </h2>
                <p className="text-sm text-white/60">
                  This section is private and accessible only to invited users.
                </p>
              </div>

              {/* Admin Sign In */}
              <SignInButton mode="modal" forceRedirectUrl="/admin/projects">
                <button className="relative w-full overflow-hidden rounded-lg py-3 text-sm font-semibold text-white transition-all duration-300 group">
                  <span className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-600 group-hover:opacity-90" />
                  <span className="relative flex items-center justify-center gap-2">
                    Admin Sign In
                  </span>
                </button>
              </SignInButton>

              {/* Separator */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/40">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Back to Portfolio */}
              <Link
                href="/"
                className="inline-flex justify-center items-center gap-2 w-full rounded-lg border border-white/10 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition"
              >
                <ArrowLeft size={16} /> Back to Portfolio
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
