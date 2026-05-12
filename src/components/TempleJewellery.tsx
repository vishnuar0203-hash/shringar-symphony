import temple from "@/assets/collection-temple.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { GoldParticles } from "./GoldParticles";

export function TempleJewellery() {
  const items = products.filter((p) => p.category === "Temple");
  return (
    <section id="temple" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0">
        <img src={temple} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa-deep via-cocoa-deep/95 to-cocoa-deep" />
      </div>
      <GoldParticles count={12} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal variant="left">
            <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-champagne">
              <span className="h-px w-8 bg-champagne" /> Temple Jewellery
            </p>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              <span className="text-gold-gradient italic">Sacred Designs,</span>
              <br />
              <span className="text-foreground">Divine Craftsmanship</span>
            </h2>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <p className="max-w-md text-muted-foreground">
              Inspired by the deities and dancers of Tamil Nadu — intricate Lakshmi pendants, Kemp stones and
              antique gold finishes that echo centuries of tradition.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.id} variant="up" delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

