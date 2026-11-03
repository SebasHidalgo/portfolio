type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
};

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label className="label mb-2 block" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
