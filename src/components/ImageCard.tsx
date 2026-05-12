import { MessageCircle, Plus } from "lucide-react";
import type { ImageItem } from "@/lib/images";
import { WHATSAPP_NUMBER } from "@/lib/products";
import { useCart } from "@/lib/cart";

type Aspect = "portrait" | "square" | "landscape";

const aspectClass: Record<Aspect, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[5/4]",
};

/**
 * Reusable luxury product/collection card.
 * Image is read from the central registry in `src/lib/images.ts`.
 */
export function ImageCard({
  item,
  aspect = "portrait",
  showAddToCart = true,
}: {
  item: ImageItem;
  aspect?: Aspect;
  showAddToCart?: boolean;
}) {
  const { add } = useCart();

  const inquiryText = encodeURIComponent(
    `Hi AVS Kollam Gold Covering ✨\n\nI'm interested in "${item.title}"${item.price ? ` (${item.price})` : ""}.\nCould you share more details and availability?`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${inquiryText}`;

  return (
    <article className="luxury-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-luxury">
      {/* === EDITABLE IMAGE AREA ===================================== */}
      <div className={`product-img-wrap relative w-full ${aspectClass[aspect]} bg-cocoa-deep/40`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/85 via-cocoa-deep/0 to-transparent" />

        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cocoa-deep shadow-gold-glow">
            {item.tag}
          </span>
        )}

        {showAddToCart && item.price && (
          <button
            onClick={() =>
              add({
                id: item.id,
                name: item.title,
                category: (item.category === "Necklace" ? "Bridal" : item.category === "Earrings" ? "Fashion" : item.category === "Bangles" ? "Gold Covering" : item.category) as any,
                price: item.price ?? "",
                image: item.image,
                tag: item.tag,
              })
            }
            className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gold-gradient text-cocoa-deep opacity-0 shadow-gold-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            aria-label={`Add ${item.title} to cart`}
          >
            <Plus size={18} />
          </button>
        )}
      </div>
      {/* ============================================================ */}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-champagne/80">{item.category}</p>
        <h3 className="font-display text-xl leading-tight text-foreground md:text-2xl">{item.title}</h3>
        {item.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          {item.price && <span className="text-lg text-champagne">{item.price}</span>}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-maroon/30 px-4 py-2 text-xs uppercase tracking-wider text-champagne transition-all hover:border-champagne hover:bg-maroon/60 hover:shadow-gold-glow"
          >
            <MessageCircle size={14} /> Inquire
          </a>
        </div>
      </div>
    </article>
  );
}
