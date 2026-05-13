import { Link } from "@tanstack/react-router";
import { MessageCircle, Plus } from "lucide-react";
import type { Product } from "@/lib/queries";
import { resolveImage } from "@/lib/asset-fallbacks";
import { inquiryUrl, formatPrice } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";

export function DynamicProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const url = inquiryUrl({
    productCode: product.code,
    productName: product.name,
    price: product.price ? Number(product.price) : null,
    offerPrice: product.offer_price ? Number(product.offer_price) : null,
  });
  const oos = product.stock_status === "out_of_stock";

  return (
    <article className="luxury-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-luxury">
      <Link
        to="/product/$code"
        params={{ code: product.code }}
        className="product-img-wrap relative block aspect-[4/5] w-full bg-cocoa-deep/40"
      >
        <img
          src={resolveImage(product.main_image)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/85 via-cocoa-deep/0 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_bestseller && <Badge>Bestseller</Badge>}
          {product.is_trending && <Badge>Trending</Badge>}
          {product.is_new_arrival && <Badge>New</Badge>}
        </div>

        {oos && (
          <span className="absolute right-3 top-3 rounded-full bg-cocoa-deep/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-champagne">
            Out of stock
          </span>
        )}

        {!oos && (
          <button
            onClick={(e) => {
              e.preventDefault();
              add({
                id: product.id,
                name: product.name,
                category: "Bridal",
                price: formatPrice(product.offer_price ? Number(product.offer_price) : Number(product.price)),
                image: resolveImage(product.main_image),
                tag: product.is_new_arrival ? "New" : undefined,
              });
            }}
            className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gold-gradient text-cocoa-deep opacity-0 shadow-gold-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            aria-label={`Add ${product.name} to inquiry list`}
          >
            <Plus size={18} />
          </button>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-champagne/80">{product.code}</p>
        <Link
          to="/product/$code"
          params={{ code: product.code }}
          className="font-display text-xl leading-tight text-foreground transition-colors hover:text-champagne md:text-2xl"
        >
          {product.name}
        </Link>
        {product.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="flex items-baseline gap-2">
            {product.offer_price && product.price && Number(product.offer_price) < Number(product.price) ? (
              <>
                <span className="text-lg text-champagne">{formatPrice(Number(product.offer_price))}</span>
                <span className="text-xs text-muted-foreground line-through">{formatPrice(Number(product.price))}</span>
              </>
            ) : (
              <span className="text-lg text-champagne">{formatPrice(product.price ? Number(product.price) : null)}</span>
            )}
          </div>
          <a
            href={url}
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cocoa-deep shadow-gold-glow">
      {children}
    </span>
  );
}
