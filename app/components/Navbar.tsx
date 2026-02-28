"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "Sobre Mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["about", "projects", "experience", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10, 10, 15, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 0 20px rgba(79,142,247,0.4)",
              }}
            >
              SB
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color:
                  activeSection === link.href.slice(1) ? "#f0f0ff" : undefined,
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                color: "#8892b0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#f0f0ff";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(79,142,247,0.5)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(79,142,247,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#8892b0";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.06)";
              }}
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                color: "#8892b0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#f0f0ff";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(79,142,247,0.5)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(79,142,247,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#8892b0";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.06)";
              }}
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#f0f0ff",
            cursor: "pointer",
            padding: "8px",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(10, 10, 15, 0.95)",
            backdropFilter: "blur(20px)",
            padding: "1.5rem 2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: "1rem" }}
            >
              {link.label}
            </a>
          ))}
          <div
            style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#8892b0" }}
            >
              GitHub
            </a>
            <span style={{ color: "#4a5568" }}>|</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#8892b0" }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
