export default function SectionTitle({
  badge,
  title,
  description,
}) {
  return (
    <div className="max-w-3xl">

      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#7C8798]">

        <span className="h-1.5 w-1.5 rounded-sm bg-[#3ECF8E]" />

        {badge}

      </div>

      <h2 className="mt-5 font-mono text-4xl font-bold text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-6 leading-8 text-[#7C8798]">
          {description}
        </p>
      )}

    </div>
  );
}