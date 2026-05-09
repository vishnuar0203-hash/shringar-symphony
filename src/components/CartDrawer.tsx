import { X, Minus, Plus, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, count, whatsappUrl, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-cocoa-deep/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-champagne/20 bg-cocoa shadow-luxury transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-champagne">Your Selection</p>
            <h3 className="font-display text-2xl text-foreground">Cart ({count})</h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full border border-border p-2 text-foreground/70 hover:text-champagne"
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingBag className="mb-4 text-champagne/60" size={42} />
              <p className="font-display text-2xl text-foreground">Your cart is empty</p>
              <p className="mt-2 text-sm">Add a few favourites to send your order on WhatsApp.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 rounded-xl border border-border/50 bg-card p-3">
                  <img src={i.image} alt={i.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-[10px] uppercase tracking-wider text-champagne">{i.category}</p>
                    <p className="font-display text-lg leading-tight text-foreground">{i.name}</p>
                    <p className="text-sm text-champagne">{i.price}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-border">
                        <button
                          onClick={() => setQty(i.id, i.qty - 1)}
                          className="px-2 py-1 text-foreground/70 hover:text-champagne"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="px-2 py-1 text-foreground/70 hover:text-champagne"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border/50 p-6">
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Submit your order via WhatsApp — we'll confirm pricing, share videos and arrange delivery.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-4 text-sm font-medium tracking-wider text-cocoa-deep shadow-gold-glow transition-transform hover:scale-[1.02] ${
              items.length === 0 ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <MessageCircle size={18} /> Send Order on WhatsApp
          </a>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-champagne"
            >
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
