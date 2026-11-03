import { Plus, X } from "lucide-react";

type Props = {
  title: string;
  count: number;
  showForm: boolean;
  toggleForm: () => void;
  addLabel: string;
};

export function Header({ title, count, showForm, toggleForm, addLabel }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-ink pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="h2">{title}</h1>
        <p className="label mt-2">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>

      <button
        type="button"
        onClick={toggleForm}
        className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`}
      >
        {showForm ? (
          <X size={16} aria-hidden="true" />
        ) : (
          <Plus size={16} aria-hidden="true" />
        )}
        {showForm ? "Cancel" : addLabel}
      </button>
    </div>
  );
}
