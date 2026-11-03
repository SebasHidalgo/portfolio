"use client";

import { useState } from "react";
import {
  Folder,
  BriefcaseBusiness,
  GraduationCap,
  Code,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { PROFILE } from "@/lib/profile";

export const NAV = [
  { id: "projects", label: "Projects", icon: Folder, href: "/admin/projects" },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
    href: "/admin/experience",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    href: "/admin/education",
  },
  { id: "skills", label: "Skills", icon: Code, href: "/admin/skills" },
];

export default function AdminSidebar() {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="btn-icon fixed left-5 top-5 z-40 md:hidden"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-60 flex-col border-r border-rule bg-sheet px-4 py-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-8 flex items-center justify-between pl-2">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center bg-signal text-sm font-extrabold text-ink">
              {PROFILE.initials}
            </span>
            <div>
              <p className="text-[0.9375rem] font-bold leading-none">
                Portfolio Admin
              </p>
              <p className="label mt-1.5">Content manager</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            className="btn-icon md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Admin sections" className="flex flex-col gap-1">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);

            return (
              <Link
                key={n.id}
                href={n.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-ink font-semibold text-paper"
                    : "font-medium text-ink-2 hover:bg-paper hover:text-ink"
                }`}
              >
                <n.icon size={18} aria-hidden="true" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-rule pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-paper hover:text-ink"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to portfolio
          </Link>

          <button
            type="button"
            onClick={() => signOut({ redirectUrl: "/" })}
            className="flex items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-error transition-colors hover:bg-paper"
          >
            <LogOut size={18} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
