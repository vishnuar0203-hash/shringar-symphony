import bridal from "@/assets/collection-bridal.jpg";
import temple from "@/assets/collection-temple.jpg";
import bangles from "@/assets/collection-bangles.jpg";
import earrings from "@/assets/collection-earrings.jpg";
import showcase from "@/assets/showcase-bridal.jpg";

export type Product = {
  id: string;
  name: string;
  category: "Bridal" | "Temple" | "Gold Covering" | "Fashion";
  price: string;
  image: string;
  tag?: string;
};

export const products: Product[] = [
  { id: "p1", name: "Lakshmi Temple Haram", category: "Temple", price: "₹ 18,500", image: temple, tag: "Bestseller" },
  { id: "p2", name: "Kerala Bridal Necklace Set", category: "Bridal", price: "₹ 24,900", image: bridal, tag: "New" },
  { id: "p3", name: "Royal Antique Bangles", category: "Gold Covering", price: "₹ 6,800", image: bangles },
  { id: "p4", name: "Kemp Stone Jhumkas", category: "Temple", price: "₹ 4,200", image: earrings, tag: "Trending" },
  { id: "p5", name: "Mullaipoo Long Haram", category: "Bridal", price: "₹ 21,500", image: showcase },
  { id: "p6", name: "Antique Gold Choker", category: "Fashion", price: "₹ 7,900", image: temple },
  { id: "p7", name: "Pearl Drop Jhumkas", category: "Fashion", price: "₹ 3,500", image: earrings, tag: "Trending" },
  { id: "p8", name: "Coin Lakshmi Haram", category: "Temple", price: "₹ 16,800", image: bridal },
];

export const WHATSAPP_NUMBER = "919443693606";
