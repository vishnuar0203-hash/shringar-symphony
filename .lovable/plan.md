# Plan — Scalable Product System with Admin Panel

## Goal
Replace the static `src/lib/products.ts` / `src/lib/images.ts` data with a Lovable Cloud (Supabase) backend, plus a password-protected admin panel where you add/edit/delete products, change prices, upload images, toggle stock, and manage categories/filters — without touching code.

## Phase 1 — Backend (Lovable Cloud)

**Tables**
- `categories` — id, slug, name, parent_id (for subcategories), sort_order, is_active
- `products` — id, code (unique), name, description, category_id, subcategory_id, price, offer_price, stock_status (`in_stock` | `out_of_stock` | `made_to_order`), is_trending, is_bestseller, is_new_arrival, finish_type, stone_type, gender (`women`|`men`|`kids`|`unisex`), weight_type, occasion, warranty, regional_collection, is_active, created_at
- `product_images` — id, product_id, url, is_main, sort_order
- `filter_options` — id, group (`stone_type`, `finish_type`, `weight_type`, `occasion`, `regional_collection`, `warranty`), value, sort_order  (so you can add/remove filter values from the admin)
- `user_roles` — id, user_id, role (enum: `admin`) + `has_role()` security-definer function (per Lovable role-storage rules)

**Storage**
- Public bucket `product-images` for uploaded photos.

**RLS**
- Public SELECT on `categories`, `products` (where `is_active`), `product_images`, `filter_options`.
- All INSERT/UPDATE/DELETE restricted to `has_role(auth.uid(), 'admin')`.

**Seed**
- Insert the 14 categories you listed (Bridal, Temple, Necklaces, Harams, Earrings & Jhumkas, Bangles & Bracelets, Chains & Mugappu, Rings, Anklets & Toe Rings, Kids, Men, Daily Wear, Premium, plus virtual New Arrivals / Trending derived from flags).
- Migrate the existing demo products from `products.ts` / `images.ts` into the DB so the site isn't empty on first load.
- Default filter values for each filter group.

## Phase 2 — Public site (dynamic, replaces hard-coded arrays)

- New route `/shop` with full filter sidebar + grid (sticky filter button on mobile, drawer).
- New route `/product/$code` — gallery, description, all attributes, WhatsApp inquiry, "Copy product code", "Share to WhatsApp".
- Category routes via `/shop?category=<slug>` (URL state via TanStack search params, so filters are shareable).
- Search bar in header (by name + product code, suggestions).
- Homepage sections (Featured Collections, Trending, New Arrivals, Bridal, Temple) all read live from the DB — adding a product with `is_trending = true` makes it appear in Trending automatically. No code changes needed.
- Each product card: image, title, code, price (with offer price strike-through if set), stock badge, trending/bestseller/new tags, WhatsApp inquiry button.
- "Recently viewed" via `localStorage`.
- Related products = same category, excluding current.
- Out-of-stock products show badge + disable cart, but keep WhatsApp inquiry.

## Phase 3 — Admin panel (`/admin`)

- Email + password login (default Lovable Cloud auth). Only users with `admin` role get in; everyone else is redirected.
- `/admin/products` — table with search, filter, edit/delete, "Mark out of stock", toggle Trending / Bestseller / New Arrival.
- `/admin/products/new` and `/admin/products/$id` — form covering every field listed in your brief, drag-and-drop multi-image upload to the storage bucket, pick main thumbnail.
- `/admin/categories` — add / rename / reorder / deactivate categories and subcategories.
- `/admin/filters` — add / remove values for each filter group (stone, finish, weight, occasion, regional, warranty).
- `/admin/users` — assign admin role to additional emails.

## Phase 4 — UX polish (kept from current site)

- Premium maroon + antique gold theme, glassmorphism filter drawer, soft glow hover, cinematic reveal animations — all already present, reused on new components.
- WhatsApp number wired everywhere: **+91 94436 93606** (note: your message had "944369360" — 9 digits; I'll use the 10-digit number `9443693606` already in `products.ts`. Tell me if that's wrong).
- No fake discounts / free delivery / COD copy anywhere.

## Out of scope (intentionally, per your brief)
- Real checkout, payments, COD, delivery — schema supports `offer_price` for later, but no checkout flow is built now.

## Technical notes
- Stack: TanStack Start + Lovable Cloud (Supabase). Browser client for reads (RLS-safe); writes via authenticated client gated by `has_role`.
- Image uploads go directly to the `product-images` storage bucket from the admin form.
- No Edge Functions needed — RLS + Supabase JS client cover all CRUD.
- The current `src/lib/products.ts` / `src/lib/images.ts` are removed; components read from a new `useProducts` / `useCategories` hook layer (`@tanstack/react-query`).

## Delivery
Given the size, I'll ship in this order in one go: enable Cloud → schema + seed → public catalog dynamic → admin panel. After that, you'll be able to manage everything from `/admin` without me.

Confirm to proceed (or tell me to drop/adjust anything — e.g. skip seed migration, change WhatsApp number, defer admin panel).
