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
        <span className="msym" style={{ fontSize: 18 }}>
          edit
        </span>
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
        <span className="msym" style={{ fontSize: 18 }}>
          delete
        </span>
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
    <div
      style={{
        gridColumn: "1/-1",
        textAlign: "center",
        padding: "64px 32px",
        border: "1px dashed rgba(255,255,255,0.1)",
        borderRadius: 20,
      }}
    >
      <p style={{ color: "#444", fontSize: 14, marginBottom: 20 }}>
        No {label}s found. Create your first one!
      </p>
      <button
        onClick={onClick}
        style={{
          padding: "10px 24px",
          borderRadius: 10,
          border: `1px solid ${accent}`,
          background: "transparent",
          color: accent,
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        + Add {label}
      </button>
    </div>
  );
}
