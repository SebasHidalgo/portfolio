"use client";

import { useEffect, useRef, useState } from "react";
import type { Experience, Education } from "@/types";

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

function formatPeriod(startIso: Date, endIso: Date): string {
  const s = startIso;
  const e = endIso;
  return `${MONTHS[s.getMonth()]} ${s.getFullYear()} – ${MONTHS[e.getMonth()]} ${e.getFullYear()}`;
}
interface ExperienceSectionProps {
  experiences: Experience[];
  educations: Education[];
}

export default function ExperienceSection({
  experiences,
  educations,
}: ExperienceSectionProps) {
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

  // Map DB Experience rows → display shape
  const displayExperiences = experiences.map((e, i) => ({
    key: e.id,
    title: e.position,
    company: e.company,
    period: formatPeriod(e.startDate, e.endDate),
    location: e.ubication,
    color:
      e.color ||
      (i % 3 === 0 ? "#4f8ef7" : i % 3 === 1 ? "#a855f7" : "#22d3ee"),
    achievements: e.achievements,
  }));

  // Map DB Education rows → display shape
  const displayEducation = educations.map((e) => ({
    key: e.id,
    degree: e.degree,
    institution: e.institution,
    period: formatPeriod(e.startDate, e.endDate),
    gpa: e.ubication,
  }));

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
            // 03. EXPERIENCE
          </p>

          <h2 className="section-title gradient-text-blue-purple">
            Professional Background
          </h2>

          <p className="section-subtitle">
            My journey through the world of software development
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
              key={exp.key}
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
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3 className="text-[1.4rem] font-bold mb-6 text-center text-foreground">
            Education
          </h3>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {displayEducation.map((edu, i) => (
              <div
                key={edu.key}
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
