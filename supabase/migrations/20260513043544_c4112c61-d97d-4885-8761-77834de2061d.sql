
-- ============ ENUMS ============
create type public.app_role as enum ('admin');
create type public.stock_status as enum ('in_stock', 'out_of_stock', 'made_to_order');
create type public.gender_type as enum ('women', 'men', 'kids', 'unisex');

-- ============ ROLES ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ CATEGORIES ============
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.categories enable row level security;
create policy "Public read active categories" on public.categories for select using (true);
create policy "Admin write categories" on public.categories for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ FILTER OPTIONS ============
create table public.filter_options (
  id uuid primary key default gen_random_uuid(),
  group_name text not null, -- 'stone_type'|'finish_type'|'weight_type'|'occasion'|'regional_collection'|'warranty'
  value text not null,
  sort_order int not null default 0,
  unique (group_name, value)
);
alter table public.filter_options enable row level security;
create policy "Public read filters" on public.filter_options for select using (true);
create policy "Admin write filters" on public.filter_options for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ PRODUCTS ============
create table public.products (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  subcategory_id uuid references public.categories(id) on delete set null,
  price numeric(10,2),
  offer_price numeric(10,2),
  stock_status stock_status not null default 'in_stock',
  is_trending boolean not null default false,
  is_bestseller boolean not null default false,
  is_new_arrival boolean not null default false,
  is_active boolean not null default true,
  finish_type text,
  stone_type text,
  gender gender_type not null default 'women',
  weight_type text,
  occasion text,
  warranty text,
  regional_collection text,
  main_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "Public read active products" on public.products for select using (is_active = true or public.has_role(auth.uid(),'admin'));
create policy "Admin write products" on public.products for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create index on public.products (category_id);
create index on public.products (is_trending);
create index on public.products (is_new_arrival);
create index on public.products (is_bestseller);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();

-- ============ PRODUCT IMAGES ============
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  url text not null,
  is_main boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.product_images enable row level security;
create policy "Public read product images" on public.product_images for select using (true);
create policy "Admin write product images" on public.product_images for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create index on public.product_images (product_id);

-- ============ STORAGE BUCKET ============
insert into storage.buckets (id, name, public) values ('product-images','product-images', true)
on conflict (id) do nothing;

create policy "Public read product images bucket" on storage.objects for select
  using (bucket_id = 'product-images');
create policy "Admin upload product images" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
create policy "Admin update product images" on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
create policy "Admin delete product images" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
