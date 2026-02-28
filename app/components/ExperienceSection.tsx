"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Innovation",
    period: "Ene 2023 – Presente",
    location: "Remote",
    color: "#4f8ef7",
    achievements: [
      "Lideré el desarrollo de arquitectura de microservicios enterprise-scale, mejorando el throughput del sistema en 40%.",
      "Implementé estrategias de caché con Redis, reduciendo la latencia de las APIs en 65%.",
      "Mentoricé a 4 desarrolladores junior, estableciendo estándares de código y mejores prácticas.",
      "Diseñé e implementé un sistema CI/CD con GitHub Actions y Docker, reduciendo el tiempo de despliegue en 70%.",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
  {
    title: "Mid-Level Software Engineer",
    company: "Digital Solutions SA",
    period: "Mar 2021 – Dic 2022",
    location: "Ciudad de México",
    color: "#a855f7",
    achievements: [
      "Desarrollé interfaces frontend de alta fidelidad para clientes Fortune 500 usando React y TypeScript.",
      "Lideré la migración de sistemas jQuery legacy a Vue.js moderno, mejorando el rendimiento en 45%.",
      "Construí APIs RESTful con Node.js, manejando +10K solicitudes diarias con 99.9% de uptime.",
      "Colaboré en sprints Agile con equipos de 8+ personas usando Jira y metodología Scrum.",
    ],
    tech: ["Vue.js", "React", "Node.js", "MySQL", "TypeScript"],
  },
  {
    title: "Junior Web Developer",
    company: "StartupHub México",
    period: "Jun 2019 – Feb 2021",
    location: "Guadalajara",
    color: "#22d3ee",
    achievements: [
      "Colaboré con el equipo de diseño para implementar layouts web responsivos a partir de mockups en Figma.",
      "Optimicé consultas SQL que redujeron el tiempo de carga de páginas en 15%.",
      "Desarrollé componentes React reutilizables que aceleraron el desarrollo de nuevas features en un 30%.",
    ],
    tech: ["HTML/CSS", "JavaScript", "React", "PHP", "MySQL"],
  },
];

const education = [
  {
    degree: "Ingeniería en Sistemas Computacionales",
    institution: "Instituto Tecnológico de México",
    period: "2015 – 2019",
    gpa: "9.2/10",
  },
  {
    degree: "Certificación AWS Solutions Architect",
    institution: "Amazon Web Services",
    period: "2022",
    gpa: "Aprobado con distinción",
  },
];

export default function ExperienceSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 2rem",
        background:
          "linear-gradient(180deg, transparent, rgba(168,85,247,0.03), transparent)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#22d3ee",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.85rem",
              marginBottom: "0.75rem",
              letterSpacing: "0.2em",
            }}
          >
            // 03. EXPERIENCIA
          </p>
          <h2 className="section-title gradient-text-blue-purple">
            Trayectoria Profesional
          </h2>
          <p className="section-subtitle">
            Mi viaje a través del mundo del desarrollo de software
          </p>
        </div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            paddingBottom: "2rem",
          }}
          className="timeline-container"
        >
          {/* Vertical line */}
          <div
            className="timeline-line"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          />

          {experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                marginBottom: "3rem",
                position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s ease ${i * 0.2}s`,
              }}
              className="timeline-item"
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "24px",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                }}
                className="timeline-dot-wrapper"
              >
                <div
                  className="timeline-dot"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 0 4px ${exp.color}33, 0 0 20px ${exp.color}`,
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="glass"
                style={{
                  width: "46%",
                  padding: "1.5rem",
                  borderRadius: "16px",
                  borderColor: `${exp.color}22`,
                  transition: "all 0.3s ease",
                  marginLeft: i % 2 === 0 ? "0" : "auto",
                  marginRight: i % 2 === 0 ? "auto" : "0",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${exp.color}55`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 30px ${exp.color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${exp.color}22`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Period badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    background: `${exp.color}15`,
                    border: `1px solid ${exp.color}30`,
                    borderRadius: "50px",
                    fontSize: "0.75rem",
                    color: exp.color,
                    fontFamily: "JetBrains Mono, monospace",
                    marginBottom: "0.75rem",
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {exp.period}
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#f0f0ff",
                    marginBottom: "4px",
                  }}
                >
                  {exp.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: exp.color,
                      fontWeight: 600,
                    }}
                  >
                    {exp.company}
                  </span>
                  <span style={{ color: "#4a5568" }}>·</span>
                  <span style={{ fontSize: "0.8rem", color: "#8892b0" }}>
                    {exp.location}
                  </span>
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "1rem",
                  }}
                >
                  {exp.achievements.map((a, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: "8px",
                        fontSize: "0.85rem",
                        color: "#8892b0",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: exp.color, flexShrink: 0 }}>▹</span>
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "3px 10px",
                        background: `${exp.color}12`,
                        border: `1px solid ${exp.color}25`,
                        borderRadius: "50px",
                        fontSize: "0.7rem",
                        color: exp.color,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginTop: "4rem" }}>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              textAlign: "center",
              color: "#f0f0ff",
            }}
          >
            Formación Académica
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {education.map((edu, i) => (
              <div
                key={i}
                className="glass"
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.6 + i * 0.2}s`,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  🎓
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#f0f0ff",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#4f8ef7",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.institution}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      fontSize: "0.8rem",
                      color: "#8892b0",
                    }}
                  >
                    <span>{edu.period}</span>
                    <span style={{ color: "#22d3ee" }}>{edu.gpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 20px !important; }
          .timeline-dot-wrapper { left: 20px !important; }
          .timeline-item > div:not(.timeline-dot-wrapper) {
            width: calc(100% - 50px) !important;
            margin-left: 50px !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
