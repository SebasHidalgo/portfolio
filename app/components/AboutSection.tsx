"use client";

import { useEffect, useRef, useState } from "react";

const traits = [
  { icon: "🧩", title: "Problem Solver", desc: "Lógico & Creativo" },
  { icon: "🚀", title: "Tech Enthusiast", desc: "Últimas tecnologías" },
  { icon: "📚", title: "Aprendiz Continuo", desc: "Mentalidad de crecimiento" },
  { icon: "🤝", title: "Team Player", desc: "Colaboración primero" },
];

const staticSkills = [
  { name: "React / Next.js", level: 92, color: "#4f8ef7" },
  { name: "TypeScript", level: 88, color: "#a855f7" },
  { name: "Node.js / Express", level: 85, color: "#22d3ee" },
  { name: "PostgreSQL / Prisma", level: 80, color: "#4f8ef7" },
  { name: "Docker / AWS", level: 75, color: "#a855f7" },
  { name: "GraphQL", level: 70, color: "#22d3ee" },
];

export default function AboutSection({ skills = [] }: { skills?: any[] }) {
  const displaySkills =
    skills.length > 0
      ? skills.map((s, i) => ({
          name: s.name,
          level: s.level,
          category: s.category,
          color: i % 3 === 0 ? "#4f8ef7" : i % 3 === 1 ? "#a855f7" : "#22d3ee",
        }))
      : staticSkills;
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
      className="relative z-1 py-[100px] px-8 max-md:py-[60px]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-[0.85rem] mb-3 tracking-[0.2em]">
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
        <div className="grid grid-cols-2 gap-16 items-start max-md:grid-cols-1 about-grid">
          {/* Left - Avatar and traits */}
          <div
            className={`
          flex flex-col items-center gap-8
          transition-all duration-800 ease
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
        `}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-[220px] h-[220px] rounded-full p-[3px] animate-spin-slow bg-linear-to-br from-primary via-secondary to-accent">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-[5rem]">
                  👨‍💻
                </div>
              </div>

              {/* Floating badges */}
              <div className="glass absolute -top-[10px] -right-[20px] px-[14px] py-[8px] rounded-full text-[0.8rem] font-semibold text-primary whitespace-nowrap animate-float">
                ⚡ React Expert
              </div>

              <div className="glass absolute bottom-0 -left-[30px] px-[14px] py-[8px] rounded-full text-[0.8rem] font-semibold text-secondary whitespace-nowrap animate-float [animation-delay:1s]">
                🔗 Open Source
              </div>
            </div>

            {/* Traits */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {traits.map((t, i) => (
                <div
                  key={i}
                  className="
                glass p-4 rounded-xl text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:border-primary/30
                cursor-default
              "
                >
                  <div className="text-[1.5rem] mb-1">{t.icon}</div>

                  <div className="text-[0.85rem] font-semibold text-foreground mb-[2px]">
                    {t.title}
                  </div>

                  <div className="text-[0.75rem] text-subtle">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Bio and skills */}
          <div
            className={`
          transition-all duration-800ms ease delay-200ms
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
        `}
          >
            <h3 className="text-[1.5rem] font-bold mb-4 text-foreground">
              Una historia de{" "}
              <span className="gradient-text">código y creatividad</span>
            </h3>

            <p className="text-muted leading-[1.9] mb-5 text-[0.95rem]">
              Soy un desarrollador Full Stack con pasión por construir
              interfaces futuristas y backends robustos. Con un ojo agudo para
              el diseño y un amor por el código limpio, convierto problemas
              complejos en soluciones elegantes.
            </p>

            <p className="text-muted leading-[1.9] mb-8 text-[0.95rem]">
              Mi viaje involucra aprendizaje constante y empujar los límites de
              la tecnología web moderna. Cuando no estoy programando, estoy
              explorando tendencias en UI/UX, contribuyendo a open source o
              tomando café ☕.
            </p>

            {/* Skills */}
            <h4 className="text-[1rem] font-semibold mb-5 text-foreground">
              Habilidades técnicas
            </h4>

            <div className="flex flex-col gap-4">
              {displaySkills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-[6px]">
                    <span className="text-[0.85rem] text-muted font-mono">
                      {skill.name}
                    </span>

                    <span
                      className="text-[0.8rem] font-semibold font-mono"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div className="skill-bar">
                    <div
                      className="skill-fill transition-all duration-700"
                      style={{
                        width: visible ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, ${skill.color}, ${
                          i % 2 === 0
                            ? "var(--color-secondary)"
                            : "var(--color-accent)"
                        })`,
                        transitionDelay: `${i * 0.1 + 0.3}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <div className="mt-8">
              <a
                href="/cv.pdf"
                download
                className="btn-primary inline-flex items-center gap-2 no-underline"
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
    </section>
  );
}
