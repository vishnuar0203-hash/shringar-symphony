import type { ImageItem } from "@/lib/images";
import { ImageCard } from "./ImageCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Cols = 2 | 3 | 4;

const colClass: Record<Cols, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Reusable luxury gallery section.
 * Drop in an array of items from `src/lib/images.ts`.
 */
export function CollectionGallery({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
  aspect = "portrait",
  tone = "default",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: ImageItem[];
  columns?: Cols;
  aspect?: "portrait" | "square" | "landscape";
  tone?: "default" | "maroon";
}) {
  return (
    <section id={id} className="relative overflow-hidden py-20 md:py-28">
      {tone === "maroon" && (
        <>
          <div className="absolute inset-0 bg-radial-maroon opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon-deep/20 to-transparent" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className={`grid gap-6 ${colClass[columns]}`}>
          {items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={i * 100}>
              <ImageCard item={item} aspect={aspect} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
