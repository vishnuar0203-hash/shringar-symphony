import { createFileRoute, Link } from "@tanstack/react-router";
import { useProductByCode } from "@/lib/queries";
import { resolveImage } from "@/lib/asset-fallbacks";
import { inquiryUrl, shareUrl, formatPrice } from "@/lib/whatsapp";
import { MessageCircle, Share2, Copy } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";

export const Route = createFileRoute("/product/$code")({
  component: ProductPage,
});

function ProductPage() {
  const { code } = Route.useParams();
  const { data: product, isLoading } = useProductByCode(code);

  if (isLoading) return <div className="flex min-h-screen items-center justify-center text-champagne">Loading…</div>;
  if (!product) return (
    <div className="flex min-h-screen items-center justify-center bg-cocoa-deep text-center">
      <div>
        <p className="text-champagne">Product not found.</p>
        <Link to="/" className="mt-3 inline-block text-xs uppercase tracking-wider text-champagne/70 hover:text-champagne">← Home</Link>
      </div>
    </div>
  );

  const images = product.product_images?.length
    ? product.product_images.map((i: any) => i.url)
    : [product.main_image];
  const oos = product.stock_status === "out_of_stock";

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-5 py-28 md:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <img src={resolveImage(images[0])} alt={product.name} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-luxury" />
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1).map((u: string, i: number) => (
                    <img key={i} src={resolveImage(u)} alt="" className="aspect-square rounded-lg object-cover" />
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-champagne/70">{product.categories?.name ?? "Jewellery"}</p>
              <h1 className="mt-2 font-display text-4xl text-champagne md:text-5xl">{product.name}</h1>
              <p className="mt-1 font-mono text-xs text-muted-foreground">Code: {product.code}</p>

              <div className="mt-4 flex items-baseline gap-3">
                {product.offer_price && product.price && Number(product.offer_price) < Number(product.price) ? (
                  <>
                    <span className="text-2xl text-champagne">{formatPrice(Number(product.offer_price))}</span>
                    <span className="text-base text-muted-foreground line-through">{formatPrice(Number(product.price))}</span>
                  </>
                ) : (
                  <span className="text-2xl text-champagne">{formatPrice(product.price ? Number(product.price) : null)}</span>
                )}
                {oos && <span className="ml-2 rounded-full bg-cocoa-deep/80 px-3 py-1 text-[10px] uppercase tracking-wider text-champagne">Out of stock</span>}
              </div>

              {product.description && <p className="mt-5 text-foreground/80">{product.description}</p>}

              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {([
                  ["Finish", product.finish_type], ["Stone", product.stone_type], ["Weight", product.weight_type],
                  ["Occasion", product.occasion], ["Warranty", product.warranty], ["Region", product.regional_collection],
                ] as const).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}><dt className="text-xs uppercase tracking-wider text-champagne/70">{k}</dt><dd className="text-foreground">{v}</dd></div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={inquiryUrl({ productCode: product.code, productName: product.name, price: product.price ? Number(product.price) : null, offerPrice: product.offer_price ? Number(product.offer_price) : null })} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cocoa-deep shadow-gold-glow">
                  <MessageCircle size={16} /> Inquire on WhatsApp
                </a>
                <a href={shareUrl(product.code, product.name)} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-5 py-3 text-sm uppercase tracking-wider text-champagne hover:bg-champagne/10">
                  <Share2 size={16} /> Share
                </a>
                <button onClick={() => navigator.clipboard.writeText(product.code)}
                  className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-5 py-3 text-sm uppercase tracking-wider text-champagne hover:bg-champagne/10">
                  <Copy size={16} /> Copy code
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
