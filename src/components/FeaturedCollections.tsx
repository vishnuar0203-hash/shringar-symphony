import { featuredCategories } from "@/lib/images";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function FeaturedCollections() {
  return (
    <section id="collections" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Featured Collections"
          title="Curated for Every Occasion"
          subtitle="From bridal grandeur to everyday luxury — explore our signature collections crafted with timeless South Indian artistry."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((c, i) => (
            <Reveal key={c.name} variant="up" delay={i * 120}>
              <a
                href={c.href}
                className="luxury-card group relative block h-full overflow-hidden rounded-2xl border border-border/50 shadow-luxury"
              >
                <div className="product-img-wrap aspect-[3/4]">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-champagne">{c.name}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{c.desc}</p>
                  <span className="mt-3 inline-block text-xs uppercase tracking-[0.3em] text-champagne/0 transition-all duration-500 group-hover:text-champagne">
                    Explore →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
