
-- Fix mutable search path on trigger function
create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- Restrict storage listing: only allow SELECT on individual objects (images stay viewable via direct URL)
-- Public bucket = direct URLs work without auth; this policy is fine. No change needed for that lint beyond acceptance.
