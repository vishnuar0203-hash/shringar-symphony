/**
 * 🖼️  IMAGE REGISTRY — single source of truth for every photo on the site.
 *
 *  To swap a placeholder for your own jewellery photo:
 *   1. Drop your image in `src/assets/` (or upload it through Lovable).
 *   2. Update the matching `image:` import below — that's it.
 *   3. Add new items by appending to the relevant collection array.
 *
 *  Aspect ratio used across all product cards: 4 / 5 (portrait).
 *  Hero / banner imagery is full-bleed and unconstrained.
 */

import bridal from "@/assets/collection-bridal.jpg";
import temple from "@/assets/collection-temple.jpg";
import bangles from "@/assets/collection-bangles.jpg";
import earrings from "@/assets/collection-earrings.jpg";
import necklace from "@/assets/collection-necklace.jpg";
import showcase from "@/assets/showcase-bridal.jpg";
import newArrivals from "@/assets/collection-new-arrivals.jpg";
import hero from "@/assets/hero-bride.jpg";

export type Category = "Bridal" | "Temple" | "Necklace" | "Earrings" | "Bangles" | "Fashion";

export type ImageItem = {
  id: string;
  title: string;
  description?: string;
  price?: string;
  image: string;
  category: Category;
  tag?: string;
};

/** Hero / banner imagery (full-bleed). */
export const heroImages = {
  main: hero,
  bridalShowcase: showcase,
};

/** ✨  Bridal Collections */
export const bridalCollection: ImageItem[] = [
  { id: "br-1", title: "Kerala Bridal Necklace Set", description: "Heavy haram with intricate temple work.", price: "₹ 24,900", image: bridal, category: "Bridal", tag: "Signature" },
  { id: "br-2", title: "Mullaipoo Long Haram", description: "Layered haram inspired by jasmine motifs.", price: "₹ 21,500", image: showcase, category: "Bridal" },
  { id: "br-3", title: "Royal Muhurtham Set", description: "Complete bridal set for the wedding day.", price: "₹ 32,900", image: necklace, category: "Bridal", tag: "Bestseller" },
];

/** 🛕  Temple Jewellery */
export const templeCollection: ImageItem[] = [
  { id: "tm-1", title: "Lakshmi Temple Haram", description: "Antique gold finish with goddess motifs.", price: "₹ 18,500", image: temple, category: "Temple", tag: "Bestseller" },
  { id: "tm-2", title: "Kemp Stone Choker", description: "Traditional kemp & ruby stone work.", price: "₹ 12,800", image: bridal, category: "Temple" },
  { id: "tm-3", title: "Coin Lakshmi Haram", description: "Heritage coin haram with divine craftsmanship.", price: "₹ 16,800", image: temple, category: "Temple" },
];

/** 📿  Necklace Collection */
export const necklaceCollection: ImageItem[] = [
  { id: "nk-1", title: "Antique Gold Choker", description: "Statement choker for festive occasions.", price: "₹ 7,900", image: necklace, category: "Necklace" },
  { id: "nk-2", title: "Ruby Pendant Haram", description: "Layered haram with ruby red highlights.", price: "₹ 14,500", image: bridal, category: "Necklace", tag: "New" },
  { id: "nk-3", title: "Pearl & Gold Mala", description: "Elegant pearl-drop mala for everyday luxury.", price: "₹ 5,200", image: temple, category: "Necklace" },
];

/** 💎  Earrings */
export const earringsCollection: ImageItem[] = [
  { id: "er-1", title: "Kemp Stone Jhumkas", description: "Traditional jhumkas with kemp stones.", price: "₹ 4,200", image: earrings, category: "Earrings", tag: "Trending" },
  { id: "er-2", title: "Pearl Drop Jhumkas", description: "Delicate pearl drops, daily-wear ready.", price: "₹ 3,500", image: earrings, category: "Earrings" },
  { id: "er-3", title: "Antique Chandbalis", description: "Crescent-moon design with intricate work.", price: "₹ 5,800", image: newArrivals, category: "Earrings" },
];

/** 🔔  Bangles */
export const banglesCollection: ImageItem[] = [
  { id: "bg-1", title: "Royal Antique Bangles", description: "Set of two antique-finish bangles.", price: "₹ 6,800", image: bangles, category: "Bangles" },
  { id: "bg-2", title: "Bridal Kada Set", description: "Statement kada with stone work.", price: "₹ 9,400", image: newArrivals, category: "Bangles", tag: "New" },
  { id: "bg-3", title: "Daily-Wear Gold Bangles", description: "Lightweight bangles for everyday glow.", price: "₹ 3,200", image: bangles, category: "Bangles" },
];

/** ⭐  Featured Products (hero shelf) */
export const featuredProducts: ImageItem[] = [
  bridalCollection[0],
  templeCollection[0],
  earringsCollection[0],
  necklaceCollection[1],
];

/** 🆕  New Arrivals */
export const newArrivalsCollection: ImageItem[] = [
  { id: "na-1", title: "Maroon Velvet Edit", description: "Limited edition maroon-themed bridal set.", price: "₹ 27,500", image: newArrivals, category: "Bridal", tag: "New" },
  { id: "na-2", title: "Gold Filigree Choker", description: "Hand-crafted filigree work choker.", price: "₹ 11,900", image: necklace, category: "Necklace", tag: "New" },
  { id: "na-3", title: "Festive Jhumka Set", description: "Festival-ready jhumkas with stones.", price: "₹ 4,800", image: earrings, category: "Earrings", tag: "New" },
  { id: "na-4", title: "Heritage Bangle Pair", description: "Classic temple-work bangles.", price: "₹ 7,600", image: bangles, category: "Bangles", tag: "New" },
];

/** 4-card overview for the landing grid */
export const featuredCategories = [
  { name: "Bridal", image: bridal, desc: "Heritage haram & necklace sets", href: "#bridal" },
  { name: "Temple", image: temple, desc: "Sacred Lakshmi & Kemp designs", href: "#temple" },
  { name: "Necklaces", image: necklace, desc: "Statement chokers & harams", href: "#necklaces" },
  { name: "Earrings", image: earrings, desc: "Jhumkas, chandbalis & studs", href: "#earrings" },
];
