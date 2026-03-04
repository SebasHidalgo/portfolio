type FormLayoutProps = {
  children: React.ReactNode;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  accent: string;
  title: string;
};

export default function FormLayout({
  children,
  isEditing,
  onSubmit,
  isPending,
  accent,
  title,
}: FormLayoutProps) {
  return (
    <div className="adm-glass rounded-2xl overflow-hidden mb-10">
      <div
        className="h-[3px]"
        style={{ background: `linear-gradient(90deg,${accent},${accent}40)` }}
      />

      <div className="px-8 py-7">
        <h2 className="text-lg font-bold text-white mb-6">
          {isEditing ? `Editar ${title}` : `Nueva ${title}`}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {children}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg font-bold text-sm text-white disabled:opacity-50"
              style={{ background: accent }}
            >
              {isPending ? "Guardando..." : `Guardar ${title}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
