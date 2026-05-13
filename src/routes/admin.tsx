import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category } from "@/lib/queries";
import { resolveImage } from "@/lib/asset-fallbacks";
import { formatPrice } from "@/lib/whatsapp";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — AVS Kollam Gold Covering" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) return <div className="flex min-h-screen items-center justify-center text-champagne">Loading...</div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cocoa-deep px-4">
        <div className="max-w-md rounded-2xl border border-border/60 bg-card p-8 text-center shadow-luxury">
          <h1 className="font-display text-2xl text-champagne">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) doesn't have the <code className="text-champagne">admin</code> role yet.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            To grant yourself admin access, open the Lovable Cloud backend and insert a row into the
            <code className="mx-1 text-champagne">user_roles</code> table:
            <br /><br />
            <code className="block whitespace-pre-wrap break-all rounded bg-background p-3 text-left text-[11px] text-champagne">
              user_id = {user.id}
              <br />role = admin
            </code>
          </p>
          <button onClick={() => signOut()} className="mt-6 text-xs uppercase tracking-wider text-champagne/70 hover:text-champagne">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onSignOut={signOut} email={user.email ?? ""} />;
}

function AdminDashboard({ onSignOut, email }: { onSignOut: () => void; email: string }) {
  return (
    <div className="min-h-screen bg-cocoa-deep">
      <header className="border-b border-border/40 bg-cocoa-deep/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-2xl text-champagne">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
            <Link to="/" className="rounded-full border border-champagne/30 px-4 py-2 text-champagne hover:bg-champagne/10">View site</Link>
            <button onClick={onSignOut} className="rounded-full border border-champagne/30 px-4 py-2 text-champagne hover:bg-champagne/10">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-12 px-6 py-10">
        <ProductsManager />
        <CategoriesManager />
        <FiltersManager />
      </main>
    </div>
  );
}

/* ------------------------------ PRODUCTS ------------------------------ */

function ProductsManager() {
  const qc = useQueryClient();
  const { data: products } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });
  const { data: categories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });

  const [editing, setEditing] = useState<Product | null>(null);
  const [showNew, setShowNew] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-products"] });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-champagne">Products ({products?.length ?? 0})</h2>
        <button
          onClick={() => setShowNew(true)}
          className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cocoa-deep shadow-gold-glow"
        >
          + New product
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-cocoa-deep/60 text-xs uppercase tracking-wider text-champagne/70">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Tags</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr key={p.id} className="border-t border-border/40">
                <td className="px-4 py-2"><img src={resolveImage(p.main_image)} className="h-12 w-12 rounded object-cover" alt="" /></td>
                <td className="px-4 py-2 font-mono text-xs text-champagne/80">{p.code}</td>
                <td className="px-4 py-2 text-foreground">{p.name}</td>
                <td className="px-4 py-2 text-champagne">{formatPrice(p.price ? Number(p.price) : null)}</td>
                <td className="px-4 py-2 text-xs">{p.stock_status}</td>
                <td className="px-4 py-2 text-xs">
                  {[p.is_trending && "Trending", p.is_bestseller && "Bestseller", p.is_new_arrival && "New"]
                    .filter(Boolean).join(", ") || "—"}
                </td>
                <td className="px-4 py-2 text-right">
                  <button onClick={() => setEditing(p)} className="text-xs uppercase tracking-wider text-champagne hover:underline">Edit</button>
                  <button
                    onClick={async () => {
                      if (!confirm(`Delete ${p.name}?`)) return;
                      await supabase.from("products").delete().eq("id", p.id);
                      refresh();
                    }}
                    className="ml-3 text-xs uppercase tracking-wider text-red-400 hover:underline"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showNew || editing) && (
        <ProductForm
          product={editing ?? undefined}
          categories={categories ?? []}
          onClose={() => { setEditing(null); setShowNew(false); }}
          onSaved={() => { refresh(); setEditing(null); setShowNew(false); }}
        />
      )}
    </section>
  );
}

function ProductForm({
  product, categories, onClose, onSaved,
}: { product?: Product; categories: Category[]; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    code: product?.code ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    category_id: product?.category_id ?? "",
    price: product?.price?.toString() ?? "",
    offer_price: product?.offer_price?.toString() ?? "",
    stock_status: product?.stock_status ?? "in_stock",
    is_trending: product?.is_trending ?? false,
    is_bestseller: product?.is_bestseller ?? false,
    is_new_arrival: product?.is_new_arrival ?? false,
    finish_type: product?.finish_type ?? "",
    stone_type: product?.stone_type ?? "",
    gender: product?.gender ?? "women",
    weight_type: product?.weight_type ?? "",
    occasion: product?.occasion ?? "",
    warranty: product?.warranty ?? "",
    regional_collection: product?.regional_collection ?? "",
    main_image: product?.main_image ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "_")}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    if (error) { setErr(error.message); setBusy(false); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm((f) => ({ ...f, main_image: data.publicUrl }));
    setBusy(false);
  };

  const save = async () => {
    setBusy(true); setErr(null);
    const payload = {
      ...form,
      category_id: form.category_id || null,
      price: form.price ? Number(form.price) : null,
      offer_price: form.offer_price ? Number(form.offer_price) : null,
    };
    const res = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload);
    setBusy(false);
    if (res.error) setErr(res.error.message);
    else onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-10">
      <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-card p-6 shadow-luxury">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-champagne">{product ? "Edit product" : "New product"}</h3>
          <button onClick={onClose} className="text-champagne/70 hover:text-champagne">✕</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Product code" value={form.code} onChange={(v) => setForm({ ...form, code: v })} />
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Select label="Category" value={form.category_id ?? ""} onChange={(v) => setForm({ ...form, category_id: v })}
            options={[{ value: "", label: "—" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]} />
          <Select label="Stock status" value={form.stock_status} onChange={(v) => setForm({ ...form, stock_status: v as Product["stock_status"] })}
            options={[{ value: "in_stock", label: "In stock" }, { value: "out_of_stock", label: "Out of stock" }, { value: "made_to_order", label: "Made to order" }]} />
          <Field label="Price (₹)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" />
          <Field label="Offer price (₹)" value={form.offer_price} onChange={(v) => setForm({ ...form, offer_price: v })} type="number" />
          <Field label="Finish type" value={form.finish_type ?? ""} onChange={(v) => setForm({ ...form, finish_type: v })} />
          <Field label="Stone type" value={form.stone_type ?? ""} onChange={(v) => setForm({ ...form, stone_type: v })} />
          <Field label="Weight type" value={form.weight_type ?? ""} onChange={(v) => setForm({ ...form, weight_type: v })} />
          <Field label="Occasion" value={form.occasion ?? ""} onChange={(v) => setForm({ ...form, occasion: v })} />
          <Field label="Warranty" value={form.warranty ?? ""} onChange={(v) => setForm({ ...form, warranty: v })} />
          <Field label="Regional collection" value={form.regional_collection ?? ""} onChange={(v) => setForm({ ...form, regional_collection: v })} />
          <Select label="Gender" value={form.gender} onChange={(v) => setForm({ ...form, gender: v as Product["gender"] })}
            options={["women", "men", "kids", "unisex"].map((g) => ({ value: g, label: g }))} />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wider text-champagne/70">Description</label>
            <textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground" rows={3} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wider text-champagne/70">Main image</label>
            <div className="flex items-center gap-3">
              {form.main_image && <img src={resolveImage(form.main_image)} className="h-16 w-16 rounded object-cover" alt="" />}
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                className="text-xs text-champagne" />
            </div>
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
            <Toggle label="Trending" checked={form.is_trending} onChange={(v) => setForm({ ...form, is_trending: v })} />
            <Toggle label="Bestseller" checked={form.is_bestseller} onChange={(v) => setForm({ ...form, is_bestseller: v })} />
            <Toggle label="New arrival" checked={form.is_new_arrival} onChange={(v) => setForm({ ...form, is_new_arrival: v })} />
          </div>
        </div>
        {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-full border border-champagne/30 px-4 py-2 text-xs uppercase tracking-wider text-champagne">Cancel</button>
          <button onClick={save} disabled={busy} className="rounded-full bg-gold-gradient px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cocoa-deep disabled:opacity-60">
            {busy ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-champagne/70">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground" />
    </div>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-champagne/70">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-champagne" />
      {label}
    </label>
  );
}

/* ------------------------------ CATEGORIES ------------------------------ */

function CategoriesManager() {
  const qc = useQueryClient();
  const { data: cats } = useQuery({
    queryKey: ["admin-categories-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-categories-list"] });

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl text-champagne">Categories</h2>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <input placeholder="slug-url" value={slug} onChange={(e) => setSlug(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button
            onClick={async () => {
              if (!name || !slug) return;
              await supabase.from("categories").insert({ name, slug });
              setName(""); setSlug(""); refresh();
            }}
            className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold uppercase text-cocoa-deep"
          >Add</button>
        </div>
        <ul className="divide-y divide-border/40">
          {(cats ?? []).map((c) => (
            <li key={c.id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-foreground">{c.name} <code className="ml-2 text-xs text-champagne/60">/{c.slug}</code></span>
              <button onClick={async () => { if (confirm(`Delete ${c.name}?`)) { await supabase.from("categories").delete().eq("id", c.id); refresh(); } }}
                className="text-xs uppercase tracking-wider text-red-400">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ FILTERS ------------------------------ */

function FiltersManager() {
  const qc = useQueryClient();
  const { data: filters } = useQuery({
    queryKey: ["admin-filters"],
    queryFn: async () => {
      const { data, error } = await supabase.from("filter_options").select("*").order("group_name").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  const [group, setGroup] = useState("stone_type");
  const [value, setValue] = useState("");
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-filters"] });

  const groups = ["stone_type", "finish_type", "weight_type", "occasion", "regional_collection", "warranty"];
  const grouped: Record<string, typeof filters> = {};
  (filters ?? []).forEach((f) => { (grouped[f.group_name] ??= [] as never).push(f as never); });

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl text-champagne">Filter values</h2>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <select value={group} onChange={(e) => setGroup(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            {groups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <input placeholder="New value" value={value} onChange={(e) => setValue(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button
            onClick={async () => { if (!value) return; await supabase.from("filter_options").insert({ group_name: group, value }); setValue(""); refresh(); }}
            className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold uppercase text-cocoa-deep"
          >Add</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g} className="rounded-lg border border-border/40 p-3">
              <p className="mb-2 text-xs uppercase tracking-wider text-champagne/70">{g}</p>
              <ul className="space-y-1">
                {(grouped[g] ?? []).map((f: any) => (
                  <li key={f.id} className="flex items-center justify-between text-sm">
                    <span>{f.value}</span>
                    <button onClick={async () => { await supabase.from("filter_options").delete().eq("id", f.id); refresh(); }}
                      className="text-xs text-red-400">×</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
