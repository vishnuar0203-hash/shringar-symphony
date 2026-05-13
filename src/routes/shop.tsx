import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useProducts, useCategories, useFilterOptions } from "@/lib/queries";
import { ProductGrid } from "@/components/ProductGrid";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";

const searchSchema = z.object({
  category: fallback(z.string().optional(), undefined),
  search: fallback(z.string().optional(), undefined),
  trending: fallback(z.boolean().optional(), undefined),
  newArrival: fallback(z.boolean().optional(), undefined),
  stoneType: fallback(z.string().optional(), undefined),
  finishType: fallback(z.string().optional(), undefined),
  occasion: fallback(z.string().optional(), undefined),
  inStockOnly: fallback(z.boolean().optional(), undefined),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({ meta: [{ title: "Shop — AVS Kollam Gold Covering" }] }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { data: categories } = useCategories();
  const { data: filters } = useFilterOptions();
  const { data: products, isLoading } = useProducts({
    categorySlug: search.category,
    search: search.search,
    trending: search.trending,
    newArrival: search.newArrival,
    stoneType: search.stoneType,
    finishType: search.finishType,
    occasion: search.occasion,
    inStockOnly: search.inStockOnly,
  });

  const set = (patch: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const grouped = (filters ?? []).reduce<Record<string, string[]>>((acc, f) => {
    (acc[f.group_name] ??= []).push(f.value);
    return acc;
  }, {});

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-5 py-28 md:px-8">
          <h1 className="font-display text-4xl text-champagne md:text-5xl">Shop the Collection</h1>
          <p className="mt-2 text-muted-foreground">All pieces — filter by category, stone, occasion and more.</p>

          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-border/40 bg-card p-3">
            <input
              defaultValue={search.search ?? ""}
              placeholder="Search by name or code…"
              onChange={(e) => set({ search: e.target.value || undefined })}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <Pill active={!!search.trending} onClick={() => set({ trending: !search.trending || undefined })}>Trending</Pill>
            <Pill active={!!search.newArrival} onClick={() => set({ newArrival: !search.newArrival || undefined })}>New</Pill>
            <Pill active={!!search.inStockOnly} onClick={() => set({ inStockOnly: !search.inStockOnly || undefined })}>In stock</Pill>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Pill active={!search.category} onClick={() => set({ category: undefined })}>All</Pill>
            {(categories ?? []).map((c) => (
              <Pill key={c.id} active={search.category === c.slug} onClick={() => set({ category: c.slug })}>{c.name}</Pill>
            ))}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <FilterSelect label="Stone" value={search.stoneType} options={grouped.stone_type ?? []} onChange={(v) => set({ stoneType: v })} />
            <FilterSelect label="Finish" value={search.finishType} options={grouped.finish_type ?? []} onChange={(v) => set({ finishType: v })} />
            <FilterSelect label="Occasion" value={search.occasion} options={grouped.occasion ?? []} onChange={(v) => set({ occasion: v })} />
          </div>

          <ProductGrid products={products} loading={isLoading} columns={4} />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function Pill({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${active ? "bg-gold-gradient text-cocoa-deep shadow-gold-glow" : "border border-champagne/30 text-champagne hover:bg-champagne/10"}`}>
      {children}
    </button>
  );
}
function FilterSelect({ label, value, options, onChange }: { label: string; value?: string; options: string[]; onChange: (v: string | undefined) => void }) {
  return (
    <select value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)}
      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
      <option value="">{label}: any</option>
      {options.map((o) => <option key={o} value={o}>{label}: {o}</option>)}
    </select>
  );
}
