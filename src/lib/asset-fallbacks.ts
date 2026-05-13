import bridal from "@/assets/collection-bridal.jpg";
import temple from "@/assets/collection-temple.jpg";
import bangles from "@/assets/collection-bangles.jpg";
import earrings from "@/assets/collection-earrings.jpg";
import necklace from "@/assets/collection-necklace.jpg";
import showcase from "@/assets/showcase-bridal.jpg";
import newArrivals from "@/assets/collection-new-arrivals.jpg";

export const PLACEHOLDER_IMAGE = bridal;

const FALLBACKS: Record<string, string> = {
  "collection-bridal.jpg": bridal,
  "collection-temple.jpg": temple,
  "collection-bangles.jpg": bangles,
  "collection-earrings.jpg": earrings,
  "collection-necklace.jpg": necklace,
  "showcase-bridal.jpg": showcase,
  "collection-new-arrivals.jpg": newArrivals,
};

/** Resolves any DB-stored image reference to a real loadable URL. */
export function resolveImage(url: string | null | undefined): string {
  if (!url) return PLACEHOLDER_IMAGE;
  if (url.startsWith("http")) return url;
  const file = url.split("/").pop() ?? "";
  return FALLBACKS[file] ?? PLACEHOLDER_IMAGE;
}
