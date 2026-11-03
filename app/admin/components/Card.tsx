import { ActionButtons } from "./ui";

type Card = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  children: React.ReactNode;
};

export default function Card({ title, onEdit, onDelete, children }: Card) {
  return (
    <article className="sheet flex flex-col p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug">{title}</h3>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>

      {children}
    </article>
  );
}
