import { Plus, X } from "lucide-react";

type Props = {
  title: string;
  count: number;
  accent: string;
  showForm: boolean;
  toggleForm: () => void;
  addLabel: string;
};

export function Header({
  title,
  count,
  accent,
  showForm,
  toggleForm,
  addLabel,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between mb-9">
      <div>
        <p
          className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1.5 text-center md:text-left"
          style={{ color: accent }}
        >
          // {String(count).padStart(2, "0")} items
        </p>

        <h1 className="text-[30px] font-extrabold text-white">{title}</h1>
      </div>

      <button
        onClick={toggleForm}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200
          ${showForm ? "bg-white/10 text-gray-400" : "text-white"}
        `}
        style={
          showForm
            ? {}
            : {
                background: `linear-gradient(135deg,${accent},${accent}99)`,
                boxShadow: `0 0 24px ${accent}40`,
              }
        }
      >
        {showForm ? <X size={20} /> : <Plus size={20} />}
        {showForm ? "Cancelar" : addLabel}
      </button>
    </div>
  );
}
