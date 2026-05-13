import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type FilterOption = Database["public"]["Tables"]["filter_options"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useFilterOptions() {
  return useQuery({
    queryKey: ["filter_options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("filter_options")
        .select("*")
        .order("group_name")
        .order("sort_order");
      if (error) throw error;
      return data as FilterOption[];
    },
  });
}

export type ProductFilters = {
  categorySlug?: string;
  search?: string;
  trending?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  stoneType?: string;
  finishType?: string;
  weightType?: string;
  occasion?: string;
  gender?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
};

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      let q = supabase.from("products").select("*, categories!products_category_id_fkey(slug,name)").eq("is_active", true);
      if (filters.categorySlug) {
        const { data: cat } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", filters.categorySlug)
          .maybeSingle();
        if (cat) q = q.eq("category_id", cat.id);
      }
      if (filters.search) {
        q = q.or(`name.ilike.%${filters.search}%,code.ilike.%${filters.search}%`);
      }
      if (filters.trending) q = q.eq("is_trending", true);
      if (filters.newArrival) q = q.eq("is_new_arrival", true);
      if (filters.bestseller) q = q.eq("is_bestseller", true);
      if (filters.stoneType) q = q.eq("stone_type", filters.stoneType);
      if (filters.finishType) q = q.eq("finish_type", filters.finishType);
      if (filters.weightType) q = q.eq("weight_type", filters.weightType);
      if (filters.occasion) q = q.eq("occasion", filters.occasion);
      if (filters.gender) q = q.eq("gender", filters.gender as Product["gender"]);
      if (filters.inStockOnly) q = q.eq("stock_status", "in_stock");
      if (filters.minPrice != null) q = q.gte("price", filters.minPrice);
      if (filters.maxPrice != null) q = q.lte("price", filters.maxPrice);
      q = q.order("created_at", { ascending: false });
      if (filters.limit) q = q.limit(filters.limit);
      const { data, error } = await q;
      if (error) throw error;
      return data as (Product & { categories: { slug: string; name: string } | null })[];
    },
  });
}

export function useProductByCode(code: string) {
  return useQuery({
    queryKey: ["product", code],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories!products_category_id_fkey(slug,name), product_images(*)")
        .eq("code", code)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
