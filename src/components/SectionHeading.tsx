export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-champagne">
          <span className="h-px w-8 bg-champagne" /> {eyebrow}{" "}
          <span className="h-px w-8 bg-champagne" />
        </p>
      )}
      <h2 className="mb-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
        <span className="text-gold-gradient italic">{title}</span>
      </h2>
      {subtitle && <p className="text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
