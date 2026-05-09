import { Instagram, Facebook, MessageCircle, MapPin, Mail } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/products";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-champagne/10 bg-cocoa-deep pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logo} alt="AVS Kollam Gold Covering" className="mb-5 h-14 w-auto" />
            <p className="mb-6 max-w-md text-muted-foreground">
              South Indian elegance, crafted to shine. Bridal, temple, gold-covering and fashion jewellery
              for the women of Kerala, Tamil Nadu and beyond.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}` },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all hover:bg-champagne/10 hover:shadow-gold-glow"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-champagne">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Bridal", "Temple", "Gold Covering", "Fashion", "Trending", "Gallery"].map((l) => (
                <li key={l}>
                  <a href="#trending" className="hover:text-champagne">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-champagne">Visit & Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-champagne" /> Kollam, Kerala — India
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={14} className="mt-1 text-champagne" /> +91 94436 93606
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 text-champagne" /> hello@avskollam.in
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} AVS Kollam Gold Covering. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Crafted with love in Kerala</p>
        </div>
      </div>
    </footer>
  );
}
