"use client";

import { useEffect, useState } from "react";

const typingTexts = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Backend Engineer",
  "React Specialist",
  "Problem Solver",
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GraphQL",
  "Redis",
  "Prisma",
  "Tailwind",
  "Python",
  "Kubernetes",
  "MongoDB",
];

export default function HeroSection() {
  const [displayed, setDisplayed] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingTexts[typingIndex];
    const speed = deleting ? 60 : 100;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setTypingIndex((typingIndex + 1) % typingTexts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, typingIndex]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        padding: "0 2rem",
        textAlign: "center",
        paddingTop: "80px",
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "30%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating code card */}
      <div
        className="glass animate-float"
        style={{
          position: "absolute",
          top: "18%",
          right: "8%",
          padding: "16px 20px",
          borderRadius: "12px",
          display: "none",
          flexDirection: "column",
          gap: "6px",
          maxWidth: "240px",
          animationDelay: "0s",
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            color: "#4f8ef7",
          }}
        >
          <span style={{ color: "#a855f7" }}>const</span>{" "}
          <span style={{ color: "#22d3ee" }}>dev</span>{" "}
          <span style={{ color: "#8892b0" }}>= {`{`}</span>
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            color: "#8892b0",
            paddingLeft: "12px",
          }}
        >
          <span style={{ color: "#f0f0ff" }}>passion</span>:{" "}
          <span style={{ color: "#22d3ee" }}>true,</span>
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            color: "#8892b0",
            paddingLeft: "12px",
          }}
        >
          <span style={{ color: "#f0f0ff" }}>coffee</span>:{" "}
          <span style={{ color: "#22d3ee" }}>∞</span>
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
            color: "#8892b0",
          }}
        >
          {`}`}
        </div>
      </div>

      {/* Status badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 18px",
          background: "rgba(34, 197, 94, 0.1)",
          border: "1px solid rgba(34, 197, 94, 0.25)",
          borderRadius: "50px",
          marginBottom: "2rem",
          fontSize: "0.85rem",
          color: "#4ade80",
          fontWeight: 500,
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 10px #4ade80",
          }}
          className="animate-pulse-dot"
        />
        Disponible para nuevas oportunidades
      </div>

      {/* Main heading */}
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        Hola, soy <span className="gradient-text">Sebastian</span>
      </h1>

      {/* Typewriter */}
      <div
        style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
          fontWeight: 600,
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          marginBottom: "1.5rem",
          color: "#c0c8e8",
        }}
      >
        <span>{displayed}</span>
        <span
          className="typing-cursor"
          style={{
            display: "inline-block",
            width: "3px",
            height: "1.2em",
            background: "linear-gradient(#4f8ef7, #a855f7)",
            borderRadius: "2px",
            marginLeft: "2px",
          }}
        />
      </div>

      {/* Bio */}
      <p
        style={{
          fontSize: "1.1rem",
          color: "#8892b0",
          maxWidth: "600px",
          lineHeight: 1.8,
          marginBottom: "2.5rem",
        }}
      >
        Construyo experiencias web de alto impacto combinando{" "}
        <span style={{ color: "#4f8ef7" }}>interfaces elegantes</span> con{" "}
        <span style={{ color: "#a855f7" }}>arquitecturas robustas</span>.
        Apasionado por el código limpio y las soluciones creativas.
      </p>

      {/* CTA buttons */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "5rem",
        }}
      >
        <a
          href="#projects"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Ver Proyectos
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
        <a
          href="#contact"
          className="btn-secondary"
          style={{ textDecoration: "none" }}
        >
          Contáctame
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            color: "#4a5568",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background:
              "linear-gradient(to bottom, rgba(79,142,247,0.8), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Tech ticker */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: 0,
          right: 0,
          overflow: "hidden",
          padding: "16px 0",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background:
            "linear-gradient(to right, var(--bg-primary), transparent 5%, transparent 95%, var(--bg-primary))",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "3rem",
            animation: "ticker 35s linear infinite",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={i}
              style={{
                color: "#4a5568",
                fontSize: "0.85rem",
                fontFamily: "JetBrains Mono, monospace",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background:
                    i % 3 === 0
                      ? "#4f8ef7"
                      : i % 3 === 1
                        ? "#a855f7"
                        : "#22d3ee",
                }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
