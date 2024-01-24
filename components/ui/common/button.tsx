export function Button({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
}) {
  return (
    <button type={type} className="btn btn-primary btn-block">
      {children}
    </button>
  );
}
