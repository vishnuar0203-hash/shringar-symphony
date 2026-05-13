import { DynamicProductCard } from "./DynamicProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { Product } from "@/lib/queries";

type Cols = 2 | 3 | 4;
const colClass: Record<Cols, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ProductGrid({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  loading,
  columns = 3,
  tone = "default",
  emptyText = "No products yet — add some from the admin panel.",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  products: Product[] | undefined;
  loading?: boolean;
  columns?: Cols;
  tone?: "default" | "maroon";
  emptyText?: string;
}) {
  const items = products ?? [];
  return (
    <section id={id} className="relative overflow-hidden py-20 md:py-24">
      {tone === "maroon" && (
        <>
          <div className="absolute inset-0 bg-radial-maroon opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon-deep/20 to-transparent" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {title && <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />}
        {loading ? (
          <div className={`grid gap-6 ${colClass[columns]}`}>
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-card" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">{emptyText}</p>
        ) : (
          <div className={`grid gap-6 ${colClass[columns]}`}>
            {items.map((p, i) => (
              <Reveal key={p.id} variant="up" delay={i * 80}>
                <DynamicProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
