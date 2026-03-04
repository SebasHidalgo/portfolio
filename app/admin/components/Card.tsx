import { ActionButtons } from "./ui";

type Card = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  accent: string;
  children: React.ReactNode;
};

export default function Card({
  title,
  onEdit,
  onDelete,
  accent,
  children,
}: Card) {
  return (
    <div className="adm-card" style={{ borderLeft: `3px solid ${accent}` }}>
      <div className="flex justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>

        <ActionButtons onEdit={onEdit} onDelete={onDelete} editColor={accent} />
      </div>

      {children}
    </div>
  );
}
