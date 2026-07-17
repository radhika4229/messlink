export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[#3ECF8E] text-black hover:opacity-90",

    secondary:
      "border border-[#232B36] text-white hover:border-[#3ECF8E]",

    ghost:
      "text-[#7C8798] hover:text-white",
  };

  return (
    <button
      className={`rounded-lg px-5 py-3 font-mono text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}