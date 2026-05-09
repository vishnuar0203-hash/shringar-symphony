import showcase from "@/assets/showcase-bridal.jpg";
import { GoldParticles } from "./GoldParticles";

export function BridalShowcase() {
  return (
    <section id="bridal" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-gold opacity-40" />
      <GoldParticles count={15} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gold-gradient opacity-30 blur-2xl" />
          <div className="product-img-wrap relative overflow-hidden rounded-3xl shadow-luxury">
            <img
              src={showcase}
              alt="Bride wearing layered Kerala bridal jewellery"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> The Bridal Edit
          </p>
          <h2 className="mb-6 font-display text-4xl leading-tight md:text-6xl">
            <span className="text-foreground">For the Bride who </span>
            <span className="shimmer-text italic">dreams in Gold</span>
          </h2>
          <p className="mb-6 text-muted-foreground md:text-lg">
            Inspired by Kerala temples and Tamil heritage, every bridal piece tells a story of tradition,
            devotion and timeless beauty. Heavy harams, layered chokers, oddiyanams and statement jhumkas —
            crafted to make your big day unforgettable.
          </p>
          <ul className="mb-8 space-y-3">
            {[
              "Heritage temple work with kemp & ruby stones",
              "Customisable bridal sets for muhurtham & reception",
              "Premium gold-covering with lifetime polish promise",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-champagne shadow-gold-glow" />
                {t}
              </li>
            ))}
          </ul>
          <a
            href="#order"
            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium tracking-wider text-cocoa-deep shadow-gold-glow transition-transform hover:scale-105"
          >
            Book a Bridal Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
