import { SkillCategory } from "@/types";

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
];

type Props = {
  activeTab: SkillCategory;
  setActiveTab: (tab: SkillCategory) => void;
};

export function SkillsTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      className="mb-6 flex flex-wrap border-b border-rule"
    >
      {CATEGORIES.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] transition-colors ${
              isActive
                ? "border-ink text-ink"
                : "border-transparent text-ink-2 hover:text-ink"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
