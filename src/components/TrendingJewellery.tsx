import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function TrendingJewellery() {
  const trending = products.slice(0, 8);
  return (
    <section id="trending" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Trending Now"
          title="Loved by Brides Across South India"
          subtitle="Best-selling pieces this season — handpicked for their craft, glow and grace."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((p, i) => (
            <Reveal key={p.id} variant="up" delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

