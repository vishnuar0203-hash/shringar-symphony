import { Instagram } from "lucide-react";
import bridal from "@/assets/collection-bridal.jpg";
import temple from "@/assets/collection-temple.jpg";
import bangles from "@/assets/collection-bangles.jpg";
import earrings from "@/assets/collection-earrings.jpg";
import showcase from "@/assets/showcase-bridal.jpg";
import hero from "@/assets/hero-bride.jpg";
import { SectionHeading } from "./SectionHeading";

const gallery = [hero, bridal, temple, showcase, earrings, bangles];

export function InstagramGallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="@avskollam"
          title="From Our Boutique"
          subtitle="Follow us on Instagram for daily inspiration, new arrivals and bridal stories."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {gallery.map((src, i) => (
            <a
              key={i}
              href="#"
              className="group relative block aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-cocoa-deep/0 transition-all duration-500 group-hover:bg-cocoa-deep/70">
                <Instagram className="text-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
