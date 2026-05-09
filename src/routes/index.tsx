import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { BridalShowcase } from "@/components/BridalShowcase";
import { TrendingJewellery } from "@/components/TrendingJewellery";
import { TempleJewellery } from "@/components/TempleJewellery";
import { Testimonials } from "@/components/Testimonials";
import { InstagramGallery } from "@/components/InstagramGallery";
import { WhatsAppOrder } from "@/components/WhatsAppOrder";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AVS Kollam Gold Covering — South Indian Bridal & Temple Jewellery" },
      {
        name: "description",
        content:
          "Premium South Indian bridal, temple, gold covering & fashion jewellery from AVS Kollam. Beautiful designs, trusted quality, timeless shine. Order on WhatsApp.",
      },
      { property: "og:title", content: "AVS Kollam Gold Covering — South Indian Elegance" },
      {
        property: "og:description",
        content: "Bridal, temple & gold covering jewellery handcrafted for the brides of Kerala & Tamil Nadu.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <FeaturedCollections />
          <BridalShowcase />
          <TrendingJewellery />
          <TempleJewellery />
          <Testimonials />
          <InstagramGallery />
          <WhatsAppOrder />
        </main>
        <Footer />
        <CartDrawer />
        <WhatsAppFab />
      </div>
    </CartProvider>
  );
}
