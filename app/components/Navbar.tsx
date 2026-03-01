"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GithubPath from "./svg/GithubSVG";
import LinkedinPath from "./svg/LinkedinSVG";

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
      className={`
        fixed top-0 left-0 right-0 z-1000 
        transition-all duration-300 
        px-8
        ${
          scrolled
            ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-[20px] border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2">
            <div
              className="w-[38px] h-[38px] rounded-[10px] bg-linear-to-br from-primary to-secondary flex items-center 
            justify-center font-bold text-base shadow-[0_0_20px_rgba(79,142,247,0.4)]"
            >
              GH
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav flex items-center gap-8 max-md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors duration-300 ${
                activeSection === link.href.slice(1) ? "text-foreground" : ""
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="https://github.com/sebashidalgo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-muted transition-all duration-300 
              hover:text-foreground hover:border-[rgba(79,142,247,0.5)] hover:bg-[rgba(79,142,247,0.1)]"
            >
              <GithubPath width={18} height={18} />
            </a>

            <a
              href="https://linkedin.com/in/guillermo-hidalgo-alvarado"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-muted transition-all duration-300 
              hover:text-foreground hover:border-[rgba(79,142,247,0.5)] hover:bg-[rgba(79,142,247,0.1)]"
            >
              <LinkedinPath width={18} height={18} />
            </a>
          </div>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn hidden max-md:flex bg-none border-none text-foreground cursor-pointer p-2"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
            bg-[rgba(10,10,15,0.95)]
            backdrop-blur-[20px]
            px-8 py-6
            border-t border-white/10
            flex flex-col gap-5
          "
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-base"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="flex gap-3 pt-2 text-muted">
            <a
              href="https://github.com/sebashidalgo"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="text-subtle">|</span>
            <a
              href="https://www.linkedin.com/in/guillermo-hidalgo-alvarado"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
