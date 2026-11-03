import { Edit2, Trash2, Plus } from "lucide-react";

export function ActionButtons({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit"
        className="btn-icon"
      >
        <Edit2 size={16} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete"
        className="btn-icon btn-icon-danger"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export function EmptyState({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="col-span-full border border-dashed border-rule px-8 py-16 text-center">
      <p className="mb-5 text-sm text-ink-2">
        No {label.toLowerCase()}s found. Create your first one!
      </p>

      <button type="button" onClick={onClick} className="btn btn-secondary">
        <Plus size={16} aria-hidden="true" /> Add {label}
      </button>
    </div>
  );
}
