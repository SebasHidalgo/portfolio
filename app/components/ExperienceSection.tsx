import type { Experience, Education } from "@/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatPeriod(start: Date, end: Date): string {
  const s = new Date(start);
  const e = new Date(end);
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
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section"
    >
      <header className="section-head">
        <h2 id="experience-title" className="h2">
          <span className="h2-num">3</span>Experience
        </h2>
        <p className="lede">
          My journey through the world of software development
        </p>
      </header>

      {experiences.length === 0 ? (
        <p className="border border-dashed border-rule p-10 text-center text-sm text-ink-2">
          No experience published yet.
        </p>
      ) : (
        <ol className="border-t border-ink">
          {experiences.map((exp) => (
            <li
              key={exp.id}
              className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="font-mono text-sm text-ink-2 lg:col-span-3">
                <p>{formatPeriod(exp.startDate, exp.endDate)}</p>
                <p className="mt-1 text-xs">{exp.ubication}</p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="text-xl font-bold leading-snug">
                  {exp.position}
                </h3>
                <p className="mt-1 flex items-center gap-2 font-medium">
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 border border-ink/20"
                    style={{ background: exp.color || "var(--color-rule)" }}
                  />
                  {exp.company}
                </p>

                {exp.achievements.length > 0 && (
                  <ul className="marks mt-4 max-w-[65ch] space-y-2 text-[0.9375rem] leading-[1.6] text-ink-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      <h3 className="mt-16 text-xl font-bold">
        <span className="h2-num">3.1</span>Education
      </h3>

      {educations.length === 0 ? (
        <p className="mt-6 border border-dashed border-rule p-10 text-center text-sm text-ink-2">
          No education published yet.
        </p>
      ) : (
        <ol className="mt-6 border-t border-ink">
          {educations.map((edu) => (
            <li
              key={edu.id}
              className="grid gap-2 border-b border-rule py-6 lg:grid-cols-12 lg:gap-10"
            >
              <div className="font-mono text-sm text-ink-2 lg:col-span-3">
                <p>{formatPeriod(edu.startDate, edu.endDate)}</p>
                <p className="mt-1 text-xs">{edu.ubication}</p>
              </div>
              <div className="lg:col-span-9">
                <h4 className="font-semibold leading-snug">{edu.degree}</h4>
                <p className="mt-1 text-[0.9375rem] text-ink-2">
                  {edu.institution}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
