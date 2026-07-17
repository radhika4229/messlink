export default function CodeBlock({
  children,
}) {
  return (
    <pre
      className="
      overflow-auto
      rounded-xl
      bg-[#0A0E14]
      p-6
      font-mono
      text-sm
      leading-7
      text-[#3ECF8E]
      "
    >
      {children}
    </pre>
  );
}