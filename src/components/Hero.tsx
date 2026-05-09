import heroImg from "@/assets/hero-bride.jpg";
import { GoldParticles } from "./GoldParticles";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="South Indian bride wearing traditional gold temple jewellery"
          className="animate-slow-zoom h-full w-full object-cover object-center"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-transparent to-cocoa-deep/40" />
      </div>

      <GoldParticles count={30} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 md:px-12">
        <div className="max-w-2xl">
          <p className="animate-fade-up mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-champagne">
            <span className="h-px w-12 bg-champagne" /> Premium South Indian Boutique
          </p>
          <h1
            className="animate-fade-up mb-6 font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="text-foreground">South Indian</span>
            <br />
            <span className="shimmer-text italic">Elegance,</span>
            <br />
            <span className="text-foreground">Crafted to Shine</span>
          </h1>
          <p
            className="animate-fade-up mb-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "0.3s" }}
          >
            Beautiful Designs. Trusted Quality. Timeless Shine. Discover bridal, temple and gold covering
            jewellery handcrafted for the brides of Kerala & Tamil Nadu.
          </p>
          <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.45s" }}>
            <a
              href="#bridal"
              className="group relative overflow-hidden rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium tracking-wider text-cocoa-deep shadow-gold-glow transition-transform hover:scale-105"
            >
              Explore Bridal Collection
            </a>
            <a
              href="#order"
              className="rounded-full border border-champagne/40 px-8 py-3.5 text-sm tracking-wider text-champagne transition-all hover:border-champagne hover:bg-champagne/10"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <a
        href="#collections"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-champagne/70 transition-colors hover:text-champagne"
        aria-label="Scroll"
      >
        <ChevronDown className="animate-bounce" size={28} />
      </a>
    </section>
  );
}
