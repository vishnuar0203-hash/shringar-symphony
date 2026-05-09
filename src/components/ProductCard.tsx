import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="luxury-card group relative overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="product-img-wrap relative aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/90 via-cocoa-deep/0 to-transparent" />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cocoa-deep">
            {product.tag}
          </span>
        )}
        <button
          onClick={() => add(product)}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-cocoa-deep opacity-0 shadow-gold-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="p-5">
        <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-champagne/80">{product.category}</p>
        <h3 className="font-display text-xl text-foreground">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg text-champagne">{product.price}</span>
          <button
            onClick={() => add(product)}
            className="text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-champagne"
          >
            Add to Cart →
          </button>
        </div>
      </div>
    </div>
  );
}
