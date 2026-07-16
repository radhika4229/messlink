export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-xl border border-[#232B36]
      bg-[#10151D]
      p-6
      transition-all
      duration-300
      hover:border-[#3ECF8E]
      hover:-translate-y-1
      ${className}`}
    >
      {children}
    </div>
  );
}