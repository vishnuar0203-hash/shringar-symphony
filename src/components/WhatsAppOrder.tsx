import { MessageCircle, Phone, Truck, ShieldCheck } from "lucide-react";
import { GoldParticles } from "./GoldParticles";
import { WHATSAPP_NUMBER } from "@/lib/products";

export function WhatsAppOrder() {
  return (
    <section id="order" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-radial-gold opacity-50" />
      <GoldParticles count={20} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-champagne">
          <span className="h-px w-8 bg-champagne" /> Order on WhatsApp
        </p>
        <h2 className="mb-6 font-display text-4xl leading-tight md:text-6xl">
          <span className="text-foreground">Personal Service,</span>
          <br />
          <span className="shimmer-text italic">One Message Away</span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-muted-foreground md:text-lg">
          Browse, add your favourites to the cart and send us your order on WhatsApp. We confirm
          availability, share live videos of every piece, and arrange safe delivery across India.
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20AVS%20Kollam%2C%20I%20would%20like%20to%20enquire%20about%20your%20jewellery.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-sm font-medium tracking-wider text-cocoa-deep shadow-gold-glow transition-transform hover:scale-105"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-3 rounded-full border border-champagne/40 px-8 py-4 text-sm tracking-wider text-champagne hover:bg-champagne/10"
          >
            <Phone size={18} /> +91 94436 93606
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: MessageCircle, title: "1. Browse & Add", text: "Add your favourite pieces to the cart" },
            { icon: Truck, title: "2. Send on WhatsApp", text: "Submit your cart with one click" },
            { icon: ShieldCheck, title: "3. Confirm & Receive", text: "We pack it with love and ship safely" },
          ].map((s) => (
            <div key={s.title} className="glass-gold rounded-2xl p-6">
              <s.icon className="mx-auto mb-3 text-champagne" size={26} />
              <p className="font-display text-lg text-champagne">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
