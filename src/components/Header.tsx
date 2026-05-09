import { ShoppingBag, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { label: "Home", href: "#home" },
  { label: "Bridal", href: "#bridal" },
  { label: "Temple", href: "#temple" },
  { label: "Trending", href: "#trending" },
  { label: "Gallery", href: "#gallery" },
  { label: "Order", href: "#order" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-gold py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.2em] text-champagne md:text-2xl">AVS</span>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground md:text-xs">
            KOLLAM · GOLD COVERING
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm tracking-wider text-foreground/80 transition-colors hover:text-champagne"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="relative rounded-full border border-champagne/30 p-2.5 text-champagne transition-all hover:bg-champagne/10 hover:shadow-gold-glow"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-bold text-cocoa-deep">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobile((v) => !v)}
            className="rounded-full border border-champagne/30 p-2.5 text-champagne lg:hidden"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobile && (
        <nav className="animate-fade-in mt-3 flex flex-col gap-1 border-t border-border/40 bg-cocoa-deep/95 px-5 py-4 backdrop-blur lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobile(false)}
              className="rounded px-3 py-2 text-sm tracking-wider text-foreground/80 hover:bg-champagne/10 hover:text-champagne"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
