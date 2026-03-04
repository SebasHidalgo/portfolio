type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  accent: string;
};

export default function Label({ children, htmlFor, accent }: LabelProps) {
  return (
    <label
      className="block text-[10px] font-extrabold uppercase tracking-[0.18em] mb-1.5"
      style={{ color: accent }}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
