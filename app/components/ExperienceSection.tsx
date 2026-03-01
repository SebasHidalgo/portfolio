"use client";

import { useEffect, useRef, useState } from "react";

const defaultExperiences = [
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

const defaultEducation = [
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

export default function ExperienceSection({
  experiences: dbExperiences = [],
}: {
  experiences?: any[];
}) {
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

  const displayExperiences =
    dbExperiences.length > 0
      ? dbExperiences
          .filter((e) => !e.isEducation)
          .map((e) => ({
            title: e.position,
            company: e.company,
            period: e.period,
            location: "", // Add location to DB if needed later
            color: e.color || "#4f8ef7",
            achievements: e.achievements || [],
            tech: e.techStack || [],
          }))
      : defaultExperiences;

  const displayEducation =
    dbExperiences.length > 0
      ? dbExperiences
          .filter((e) => e.isEducation)
          .map((e) => ({
            degree: e.position,
            institution: e.company,
            period: e.period,
            gpa: e.achievements?.[0] || "",
          }))
      : defaultEducation;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-1 py-[100px] px-8 bg-[linear-gradient(180deg,transparent,rgba(168,85,247,0.03),transparent)]"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-[0.85rem] mb-3 tracking-[0.2em]">
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
        <div className="relative pb-8 timeline-container">
          {/* Vertical line */}
          <div
            className={`timeline-line transition-opacity duration-1000 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />

          {displayExperiences.map((exp, i) => (
            <div
              key={i}
              className={`timeline-item relative flex mb-12 transition-all duration-700 ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              } ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[30px]"
              }`}
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-6 -translate-x-1/2 z-10 timeline-dot-wrapper">
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
                className={`glass w-[46%] p-6 rounded-2xl border transition-all duration-300 ${
                  i % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
                style={{ borderColor: `${exp.color}22` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${exp.color}55`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${exp.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${exp.color}22`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Period badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75rem] font-mono mb-3 border"
                  style={{
                    background: `${exp.color}15`,
                    borderColor: `${exp.color}30`,
                    color: exp.color,
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

                <h3 className="text-[1.1rem] font-bold text-foreground mb-1">
                  {exp.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-[0.9rem] font-semibold"
                    style={{ color: exp.color }}
                  >
                    {exp.company}
                  </span>

                  <span className="text-muted">·</span>

                  <span className="text-[0.8rem] text-muted">
                    {exp.location}
                  </span>
                </div>

                <ul className="list-none flex flex-col gap-2 mb-4">
                  {exp.achievements.map((a: string, j: number) => (
                    <li
                      key={j}
                      className="flex gap-2 text-[0.85rem] text-muted leading-[1.6]"
                    >
                      <span className="shrink-0" style={{ color: exp.color }}>
                        ▹
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t: string) => (
                    <span
                      key={t}
                      className="px-2.5 py-[3px] rounded-full text-[0.7rem] font-mono border"
                      style={{
                        background: `${exp.color}12`,
                        borderColor: `${exp.color}25`,
                        color: exp.color,
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
        <div className="mt-16">
          <h3 className="text-[1.4rem] font-bold mb-6 text-center text-foreground">
            Formación Académica
          </h3>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {displayEducation.map((edu, i) => (
              <div
                key={i}
                className={`glass p-6 rounded-xl flex gap-4 items-start transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${0.6 + i * 0.2}s` }}
              >
                <div className="w-11 h-11 rounded-[10px] bg-linear-to-br from-primary to-secondary flex items-center justify-center text-xl shrink-0">
                  🎓
                </div>

                <div>
                  <h4 className="text-[0.95rem] font-semibold text-foreground mb-1">
                    {edu.degree}
                  </h4>

                  <p className="text-[0.85rem] text-primary mb-1">
                    {edu.institution}
                  </p>

                  <div className="flex gap-4 text-[0.8rem] text-muted">
                    <span>{edu.period}</span>
                    <span className="text-accent">{edu.gpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
