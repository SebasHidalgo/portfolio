import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import type { Skill } from "@/types";
import { PROFILE } from "@/lib/profile";

interface HeroSectionProps {
  skills: Skill[];
}

function pickFocus(skills: Skill[]): string[] {
  const core = skills.filter(
    (s) => s.category === "Frontend" || s.category === "Backend",
  );
  const source = core.length > 0 ? core : skills;
  return Array.from(new Set(source.map((s) => s.name))).slice(0, 8);
}

export default function HeroSection({ skills }: HeroSectionProps) {
  const focus = pickFocus(skills);
  const cell = "border-b border-rule p-4 sm:p-5";

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="border-b border-ink"
    >
      <div className="label hidden items-center justify-between border-b border-rule py-4 lg:flex">
        <span>
          {PROFILE.name} · {PROFILE.role}
        </span>
        <ul className="flex gap-6">
          <li>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1"
            >
              GitHub <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1"
            >
              LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </li>
          {PROFILE.resumeUrl && (
            <li>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1"
              >
                Résumé <Download size={12} aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="grid gap-12 py-16 lg:min-h-[calc(100dvh-3.5rem)] lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="animate-rise font-stretch-expanded text-[clamp(2.75rem,7.5vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
          >
            {PROFILE.name}
          </h1>

          <p className="animate-rise mt-6 text-xl font-medium [animation-delay:80ms] sm:text-2xl">
            {PROFILE.role}
            <span className="text-ink-2"> · {PROFILE.location}</span>
          </p>

          <p className="animate-rise mt-6 max-w-[58ch] text-base leading-[1.65] text-ink-2 [animation-delay:160ms] sm:text-lg">
            I build impactful web experiences by combining beautiful
            interfaces with robust architectures. I&apos;m passionate about
            clean code and creative solutions.
          </p>

          <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
            <a href="#projects" className="btn btn-primary">
              See projects <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact me
            </a>
          </div>
        </div>

        <dl className="animate-rise grid grid-cols-2 border border-ink bg-sheet [animation-delay:320ms] lg:col-span-5">
          <div className={`${cell} border-r`}>
            <dt className="label">Role</dt>
            <dd className="mt-1 text-sm font-medium sm:text-[0.9375rem]">
              {PROFILE.role}
            </dd>
          </div>
          <div className={cell}>
            <dt className="label">Status</dt>
            <dd className="mt-1 flex items-center gap-2 text-sm font-medium text-ok sm:text-[0.9375rem]">
              <span aria-hidden="true" className="size-2 shrink-0 bg-ok" />
              Available for new opportunities
            </dd>
          </div>
          <div className={`${cell} col-span-2 min-w-0`}>
            <dt className="label">Email</dt>
            <dd className="mt-1 text-sm font-medium sm:text-[0.9375rem]">
              <a
                href={`mailto:${PROFILE.email}`}
                className="link wrap-anywhere"
              >
                {PROFILE.email}
              </a>
            </dd>
          </div>
          <div className={`${cell} border-r`}>
            <dt className="label">Location</dt>
            <dd className="mt-1 text-sm font-medium sm:text-[0.9375rem]">
              {PROFILE.location}
            </dd>
          </div>
          <div className={cell}>
            <dt className="label">Links</dt>
            <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1"
              >
                GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {PROFILE.resumeUrl && (
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1"
                >
                  Résumé <Download size={14} aria-hidden="true" />
                </a>
              )}
            </dd>
          </div>
          {focus.length > 0 && (
            <div className="col-span-2 p-4 sm:p-5">
              <dt className="label">Focus</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {focus.map((name) => (
                  <span key={name} className="chip">
                    {name}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
