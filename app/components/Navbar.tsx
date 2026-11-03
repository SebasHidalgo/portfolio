"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import GithubSVG from "./svg/GithubSVG";
import LinkedinSVG from "./svg/LinkedinSVG";
import { PROFILE } from "@/lib/profile";

const navLinks = [
  { href: "#about", id: "about", index: "1", label: "Profile" },
  { href: "#projects", id: "projects", index: "2", label: "Projects" },
  { href: "#experience", id: "experience", index: "3", label: "Experience" },
  { href: "#contact", id: "contact", index: "4", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = link.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <nav
        aria-label="Sections"
        className="fixed inset-y-0 left-0 z-40 hidden w-14 flex-col items-center justify-between bg-signal lg:flex"
      >
        <Link
          href="/"
          aria-label={`${PROFILE.name}, back to top`}
          className="flex h-14 w-14 items-center justify-center text-sm font-extrabold tracking-tight text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          {PROFILE.initials}
        </Link>

        <ul className="flex flex-col items-center">
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active ? "location" : undefined}
                  className={`spine-link ${active ? "is-active" : ""}`}
                >
                  <span className="font-mono">{link.index}</span>
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="mb-3 flex flex-col items-center gap-1">
          <li>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-10 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <GithubSVG width={18} height={18} />
            </a>
          </li>
          <li>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-10 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <LinkedinSVG width={18} height={18} />
            </a>
          </li>
        </ul>
      </nav>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper lg:hidden">
        <div className="flex h-14 items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center bg-signal text-xs font-extrabold text-ink">
              {PROFILE.initials}
            </span>
            <span className="text-sm font-semibold">{PROFILE.name}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="btn-icon"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Sections"
            className="border-t border-rule bg-sheet"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-rule-soft">
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 text-base font-medium sm:px-8"
                  >
                    <span className="font-mono text-xs text-signal-ink">
                      {link.index}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex gap-6 px-5 py-4 text-sm font-medium sm:px-8">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-2"
              >
                <GithubSVG width={16} height={16} />
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-2"
              >
                <LinkedinSVG width={16} height={16} />
                LinkedIn
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
