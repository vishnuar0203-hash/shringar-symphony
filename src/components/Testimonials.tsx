import { Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "Aishwarya R.",
    city: "Thiruvananthapuram, Kerala",
    text: "My bridal haram from AVS was the highlight of my wedding. The craftsmanship, the shine, everything felt royal. Brides, you have to see this.",
  },
  {
    name: "Divya S.",
    city: "Madurai, Tamil Nadu",
    text: "Ordered a temple necklace through WhatsApp — they were so patient, sent multiple videos, and the piece arrived even more beautiful than expected.",
  },
  {
    name: "Lakshmi M.",
    city: "Coimbatore",
    text: "I've been buying gold-covering jewellery here for 3 years. The polish lasts, designs are unique, and prices are honest. Truly a trusted brand.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Loved by Our Brides"
          title="Words from the Heart"
          subtitle="A few stories from our beautiful customers across South India."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} variant="up" delay={i * 140}>
              <article className="luxury-card relative h-full rounded-2xl border border-border/50 bg-card p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-champagne text-champagne" />
                  ))}
                </div>
                <p className="mb-6 italic text-foreground/85">"{r.text}"</p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-display text-lg text-champagne">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.city}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
