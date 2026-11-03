type FormLayoutProps = {
  children: React.ReactNode;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  title: string;
};

export default function FormLayout({
  children,
  isEditing,
  onSubmit,
  isPending,
  title,
}: FormLayoutProps) {
  return (
    <div className="sheet mb-10 p-6 sm:p-8">
      <h2 className="mb-6 text-lg font-bold">
        {isEditing ? `Edit ${title}` : `New ${title}`}
      </h2>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{children}</div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full sm:w-auto"
          >
            {isPending ? "Saving..." : `Save ${title}`}
          </button>
        </div>
      </form>
    </div>
  );
}
