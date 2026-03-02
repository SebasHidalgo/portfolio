import { Edit2, Trash2, Plus } from "lucide-react";

export function ActionButtons({
  onEdit,
  onDelete,
  editColor = "#00f2ff",
  style,
}: {
  onEdit: () => void;
  onDelete: () => void;
  editColor?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ display: "flex", gap: 8, flexShrink: 0, ...style }}>
      <button
        onClick={onEdit}
        className="adm-btn-icon"
        style={{ color: editColor, borderColor: `${editColor}33` }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = `${editColor}22`)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
        }
      >
        <Edit2 size={18} />
      </button>
      <button
        onClick={onDelete}
        className="adm-btn-icon"
        style={{ color: "#ff4d6d", borderColor: "rgba(255,77,109,0.3)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,77,109,0.15)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
        }
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export function EmptyState({
  accent,
  label,
  onClick,
}: {
  accent: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="col-span-full text-center px-8 py-16 border border-dashed border-white/10 rounded-[20px]">
      <p className="text-[#444] text-[14px] mb-5">
        No {label}s found. Create your first one!
      </p>

      <button
        onClick={onClick}
        className="px-6 py-2.5 rounded-[10px] font-bold text-[13px] transition-all duration-200 hover:bg-white/5"
        style={{
          border: `1px solid ${accent}`,
          color: accent,
        }}
      >
        <span className="flex items-center gap-2">
          <Plus size={18} /> Add {label}
        </span>
      </button>
    </div>
  );
}
