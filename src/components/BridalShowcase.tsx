import { heroImages } from "@/lib/images";
const showcase = heroImages.bridalShowcase;
import { GoldParticles } from "./GoldParticles";
import { Reveal } from "./Reveal";

export function BridalShowcase() {
  return (
    <section id="bridal" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-maroon opacity-60" />
      <div className="absolute inset-0 bg-radial-gold opacity-30" />
      <GoldParticles count={15} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal variant="left">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gold-gradient opacity-30 blur-2xl" />
            <div className="absolute -inset-1 rounded-3xl border border-champagne/30" />
            <div className="product-img-wrap relative overflow-hidden rounded-3xl shadow-luxury">
              <img
                src={showcase}
                alt="Bride wearing layered Kerala bridal jewellery"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
        <Reveal variant="right" delay={120}>
          <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> Bridal Collections
          </p>
          <h2 className="mb-6 font-display text-4xl leading-tight md:text-6xl">
            <span className="text-foreground">Bridal </span>
            <span className="shimmer-text italic">Collections</span>
          </h2>
          <p className="mb-8 text-muted-foreground md:text-lg">
            Discover elegant bridal jewellery collections crafted to complement every wedding celebration.
            From grand necklace sets and traditional temple jewellery to matching earrings and bangles,
            AVS offers timeless designs that bring beauty and grace to every bride.
          </p>
          <ul className="mb-10 space-y-3">
            {[
              "Grand bridal necklace & haram sets",
              "Traditional temple jewellery with kemp & ruby work",
              "Matching jhumkas, bangles & complete bridal sets",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-champagne shadow-gold-glow" />
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <a
              href="#trending"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium tracking-wider text-cocoa-deep shadow-gold-glow transition-transform hover:scale-105"
            >
              Explore Bridal Collections
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-maroon/30 px-8 py-3.5 text-sm tracking-wider text-champagne transition-all hover:border-champagne hover:bg-maroon/50"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
