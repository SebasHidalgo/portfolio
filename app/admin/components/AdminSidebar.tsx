"use client";

import { useState } from "react";
import {
  Folder,
  BriefcaseBusiness,
  GraduationCap,
  Code,
  CircleChevronLeft,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export const NAV = [
  {
    id: "projects",
    label: "Projects",
    icon: Folder,
    href: "/admin/projects",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.35)",
    activeBg: "rgba(0,242,255,0.12)",
  },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
    href: "/admin/experience",
    accent: "#5050f7",
    glow: "rgba(80,80,247,0.35)",
    activeBg: "rgba(80,80,247,0.12)",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    href: "/admin/education",
    accent: "#ffb703",
    glow: "rgba(255,183,3,0.35)",
    activeBg: "rgba(255,183,3,0.12)",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Code,
    href: "/admin/skills",
    accent: "#bc13fe",
    glow: "rgba(188,19,254,0.35)",
    activeBg: "rgba(188,19,254,0.12)",
  },
];

export default function AdminSidebar() {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-5 left-5 z-40 p-2.5 bg-white/5 rounded-xl text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[240px] flex flex-col px-4 py-7 border-r border-white/10 bg-[#0f0f15] md:bg-white/5 backdrop-blur-[14px] transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-9 pl-2 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,#5050f7,#bc13fe)] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
              GH
            </div>

            <div>
              <p className="text-white font-bold text-[15px] leading-none">
                Portfolio Admin
              </p>
              <p className="text-[#555] text-[11px] mt-[3px]">
                Content Manager
              </p>
            </div>
          </div>
          <button
            className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg bg-white/5"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1.5">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);

            return (
              <Link
                key={n.id}
                href={n.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-[14px] py-[11px] rounded-xl w-full text-left text-[14px] transition-all duration-200 border-l-[3px] ${
                  active
                    ? `font-bold`
                    : `font-medium text-[#666] border-l-transparent`
                }`}
                style={
                  active
                    ? {
                        background: n.activeBg,
                        color: n.accent,
                        boxShadow: `0 0 16px ${n.glow}`,
                        borderLeft: `3px solid ${n.accent}`,
                      }
                    : undefined
                }
              >
                <n.icon size={20} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
          <a
            href="/"
            className="flex items-center justify-center gap-2.5 px-[14px] py-[10px] rounded-xl text-[13px] text-[#555] transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to portfolio
          </a>

          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="flex items-center justify-center gap-2.5 px-[14px] py-[10px] rounded-xl text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <CircleChevronLeft size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
