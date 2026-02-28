"use client";

import { useEffect, useRef, useState } from "react";

const traits = [
  { icon: "🧩", title: "Problem Solver", desc: "Lógico & Creativo" },
  { icon: "🚀", title: "Tech Enthusiast", desc: "Últimas tecnologías" },
  { icon: "📚", title: "Aprendiz Continuo", desc: "Mentalidad de crecimiento" },
  { icon: "🤝", title: "Team Player", desc: "Colaboración primero" },
];

const skills = [
  { name: "React / Next.js", level: 92, color: "#4f8ef7" },
  { name: "TypeScript", level: 88, color: "#a855f7" },
  { name: "Node.js / Express", level: 85, color: "#22d3ee" },
  { name: "PostgreSQL / Prisma", level: 80, color: "#4f8ef7" },
  { name: "Docker / AWS", level: 75, color: "#a855f7" },
  { name: "GraphQL", level: 70, color: "#22d3ee" },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#4f8ef7",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.85rem",
              marginBottom: "0.75rem",
              letterSpacing: "0.2em",
            }}
          >
            // 01. SOBRE MÍ
          </p>
          <h2 className="section-title gradient-text-blue-purple">
            Conóceme Mejor
          </h2>
          <p className="section-subtitle">
            Desarrollador apasionado por crear experiencias digitales
            extraordinarias
          </p>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left - Avatar and traits */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s ease",
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #4f8ef7 0%, #a855f7 50%, #22d3ee 100%)",
                  padding: "3px",
                  animation: "spin-slow 20s linear infinite",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "#0d0d1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "5rem",
                  }}
                >
                  👨‍💻
                </div>
              </div>
              {/* Floating badges */}
              <div
                className="glass"
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-20px",
                  padding: "8px 14px",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#4f8ef7",
                  whiteSpace: "nowrap",
                  animation: "float 4s ease-in-out infinite",
                }}
              >
                ⚡ React Expert
              </div>
              <div
                className="glass"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "-30px",
                  padding: "8px 14px",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#a855f7",
                  whiteSpace: "nowrap",
                  animation: "float 5s ease-in-out infinite 1s",
                }}
              >
                🔗 Open Source
              </div>
            </div>

            {/* Traits */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                width: "100%",
              }}
            >
              {traits.map((t, i) => (
                <div
                  key={i}
                  className="glass"
                  style={{
                    padding: "1rem",
                    borderRadius: "12px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(79,142,247,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>
                    {t.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#f0f0ff",
                      marginBottom: "2px",
                    }}
                  >
                    {t.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#8892b0" }}>
                    {t.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Bio and skills */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "#f0f0ff",
              }}
            >
              Una historia de{" "}
              <span className="gradient-text">código y creatividad</span>
            </h3>
            <p
              style={{
                color: "#8892b0",
                lineHeight: 1.9,
                marginBottom: "1.25rem",
                fontSize: "0.95rem",
              }}
            >
              Soy un desarrollador Full Stack con pasión por construir
              interfaces futuristas y backends robustos. Con un ojo agudo para
              el diseño y un amor por el código limpio, convierto problemas
              complejos en soluciones elegantes.
            </p>
            <p
              style={{
                color: "#8892b0",
                lineHeight: 1.9,
                marginBottom: "2rem",
                fontSize: "0.95rem",
              }}
            >
              Mi viaje involucra aprendizaje constante y empujar los límites de
              la tecnología web moderna. Cuando no estoy programando, estoy
              explorando tendencias en UI/UX, contribuyendo a open source o
              tomando café ☕.
            </p>

            {/* Skills */}
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "1.25rem",
                color: "#f0f0ff",
              }}
            >
              Habilidades técnicas
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {skills.map((skill, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#c0c8e8",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: skill.color,
                        fontWeight: 600,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{
                        width: visible ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, ${skill.color}, ${
                          i % 2 === 0 ? "#a855f7" : "#22d3ee"
                        })`,
                        transitionDelay: `${i * 0.1 + 0.3}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <div style={{ marginTop: "2rem" }}>
              <a
                href="/cv.pdf"
                download
                className="btn-primary"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
