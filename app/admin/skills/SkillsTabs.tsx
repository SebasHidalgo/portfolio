import { SkillCategory } from "@/types";

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
];

const CATEGORY_COLOR: Record<SkillCategory, string> = {
  Languages: "#4f8ef7",
  Frontend: "#ffb703",
  Backend: "#a855f7",
  Database: "#22d3ee",
  "DevOps & Tools": "#bc13fe",
};

type Props = {
  activeTab: SkillCategory;
  setActiveTab: (tab: SkillCategory) => void;
};

export function SkillsTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CATEGORIES.map((tab) => {
        const isActive = activeTab === tab;
        const color = CATEGORY_COLOR[tab];

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] border transition-all duration-200"
            style={{
              borderColor: isActive ? color : "rgba(255,255,255,0.1)",
              background: isActive ? `${color}20` : "transparent",
              color: isActive ? color : "rgba(255,255,255,0.45)",
              boxShadow: isActive ? `0 0 12px ${color}40` : "none",
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
