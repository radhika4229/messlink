export default function Badge({
  children,
}) {
  return (
    <span
      className="
      rounded
      bg-[#3ECF8E]/10
      px-3
      py-1
      font-mono
      text-xs
      uppercase
      tracking-wider
      text-[#3ECF8E]
      "
    >
      {children}
    </span>
  );
}