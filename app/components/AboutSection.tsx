import { Download } from "lucide-react";
import type { Skill, SkillCategory } from "@/types";
import { PROFILE } from "@/lib/profile";

const CATEGORY_ORDER: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
];

function groupSkills(skills: Skill[]) {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }
  const ordered = [...CATEGORY_ORDER, ...groups.keys()].filter(
    (c, i, arr) => groups.has(c) && arr.indexOf(c) === i,
  );
  return ordered.map((category) => ({
    category,
    items: groups.get(category) ?? [],
  }));
}

interface AboutSectionProps {
  skills: Skill[];
}

export default function AboutSection({ skills }: AboutSectionProps) {
  const groups = groupSkills(skills);

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <header className="section-head">
        <h2 id="about-title" className="h2">
          <span className="h2-num">1</span>Profile
        </h2>
        <p className="lede">
          Passionate developer creating extraordinary digital experiences
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="max-w-[60ch] lg:col-span-5">
          <h3 className="text-xl font-bold leading-snug">
            A story of code and creativity
          </h3>

          <p className="mt-4 leading-[1.7] text-ink-2">
            I am a Full Stack developer passionate about building beautiful
            interfaces and robust backends. With an eye for design and a love
            for clean code, I turn complex problems into elegant solutions.
          </p>

          <p className="mt-4 leading-[1.7] text-ink-2">
            My journey involves constant learning and pushing the boundaries of
            modern web technology. When I&apos;m not programming, I&apos;m
            exploring trends in UI/UX, contributing to open source, or just
            relaxing.
          </p>

          {PROFILE.resumeUrl && (
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-8"
            >
              <Download size={16} aria-hidden="true" />
              Download résumé
            </a>
          )}
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-base font-semibold">Technical skills</h3>

          {groups.length === 0 ? (
            <p className="mt-4 border border-dashed border-rule p-6 text-sm text-ink-2">
              No skills published yet.
            </p>
          ) : (
            <dl className="mt-4 border-t border-ink">
              {groups.map((group) => (
                <div
                  key={group.category}
                  className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <dt className="label pt-1">{group.category}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill.id} className="chip">
                        {skill.name}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
