"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV = [
  {
    id: "projects",
    label: "Projects",
    icon: "folder",
    href: "/admin/projects",
    accent: "#00f2ff",
    glow: "rgba(0,242,255,0.35)",
    activeBg: "rgba(0,242,255,0.12)",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "work",
    href: "/admin/experience",
    accent: "#5050f7",
    glow: "rgba(80,80,247,0.35)",
    activeBg: "rgba(80,80,247,0.12)",
  },
  {
    id: "education",
    label: "Education",
    icon: "school",
    href: "/admin/education",
    accent: "#ffb703",
    glow: "rgba(255,183,3,0.35)",
    activeBg: "rgba(255,183,3,0.12)",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "code",
    href: "/admin/skills",
    accent: "#bc13fe",
    glow: "rgba(188,19,254,0.35)",
    activeBg: "rgba(188,19,254,0.12)",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        position: "sticky",
        top: 80,
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 16px",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 36,
          paddingLeft: 8,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg,#5050f7,#bc13fe)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 14,
          }}
        >
          DP
        </div>
        <div>
          <p
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            Portfolio Admin
          </p>
          <p style={{ color: "#555", fontSize: 11, marginTop: 3 }}>
            Content Manager
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {NAV.map((n) => {
          const active = pathname.startsWith(n.href);
          return (
            <Link
              key={n.id}
              href={n.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                borderRadius: 12,
                cursor: "pointer",
                background: active ? n.activeBg : "transparent",
                color: active ? n.accent : "#666",
                fontWeight: active ? 700 : 500,
                fontSize: 14,
                boxShadow: active ? `0 0 16px ${n.glow}` : "none",
                borderLeft: active
                  ? `3px solid ${n.accent}`
                  : "3px solid transparent",
                transition: "all 0.2s",
                width: "100%",
                textAlign: "left",
                textDecoration: "none",
              }}
            >
              <span className="msym" style={{ fontSize: 20 }}>
                {n.icon}
              </span>
              {n.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to site */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 12,
            color: "#555",
            textDecoration: "none",
            fontSize: 13,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
        >
          <span className="msym" style={{ fontSize: 18 }}>
            arrow_back
          </span>
          Back to portfolio
        </a>
      </div>
    </aside>
  );
}
