import * as React from "react";
import type { Product } from "./products";
import { WHATSAPP_NUMBER } from "./products";

type CartItem = Product & { qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  whatsappUrl: string;
};

const Ctx = React.createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [open, setOpen] = React.useState(false);

  const add = (p: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);

  const message = React.useMemo(() => {
    if (items.length === 0) return "Hi AVS Kollam Gold Covering, I'd like to enquire about your jewellery.";
    const lines = items.map((i, idx) => `${idx + 1}. ${i.name} (${i.category}) — Qty: ${i.qty} — ${i.price}`);
    return `Hello AVS Kollam Gold Covering ✨%0A%0AI would like to order the following items:%0A%0A${lines.join("%0A")}%0A%0APlease confirm availability and total. Thank you!`;
  }, [items]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, open, setOpen, whatsappUrl }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
