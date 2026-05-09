import bridal from "@/assets/collection-bridal.jpg";
import temple from "@/assets/collection-temple.jpg";
import bangles from "@/assets/collection-bangles.jpg";
import earrings from "@/assets/collection-earrings.jpg";
import { SectionHeading } from "./SectionHeading";

const collections = [
  { name: "Bridal", image: bridal, desc: "Heritage haram & necklace sets" },
  { name: "Temple", image: temple, desc: "Sacred Lakshmi & Kemp designs" },
  { name: "Gold Covering", image: bangles, desc: "Daily-wear elegance" },
  { name: "Fashion", image: earrings, desc: "Statement jhumkas & more" },
];

export function FeaturedCollections() {
  return (
    <section id="collections" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Featured Collections"
          title="Curated for Every Occasion"
          subtitle="From bridal grandeur to everyday luxury — explore our signature collections crafted with timeless South Indian artistry."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <a
              key={c.name}
              href="#trending"
              className="luxury-card group relative block overflow-hidden rounded-2xl"
              style={{ animationDelay: `${i * 0.1}s` }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
