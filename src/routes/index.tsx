import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { BridalShowcase } from "@/components/BridalShowcase";
import { CollectionGallery } from "@/components/CollectionGallery";
import {
  bridalCollection,
  templeCollection,
  necklaceCollection,
  earringsCollection,
  banglesCollection,
  featuredProducts,
  newArrivalsCollection,
} from "@/lib/images";
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

          <CollectionGallery
            id="bridal-collection"
            eyebrow="Bridal Edit"
            title="Bridal Collections"
            subtitle="Heavy harams, layered chokers and complete bridal sets crafted for your big day."
            items={bridalCollection}
            columns={3}
            tone="maroon"
          />

          <CollectionGallery
            id="temple"
            eyebrow="Temple Jewellery"
            title="Sacred & Traditional"
            subtitle="Lakshmi pendants, kemp stones and antique gold finishes inspired by South Indian temples."
            items={templeCollection}
            columns={3}
          />

          <CollectionGallery
            id="necklaces"
            eyebrow="Necklaces"
            title="Statement Necklaces"
            subtitle="From delicate chokers to grand harams — pieces that anchor every look."
            items={necklaceCollection}
            columns={3}
            tone="maroon"
          />

          <CollectionGallery
            id="earrings"
            eyebrow="Earrings"
            title="Jhumkas, Chandbalis & More"
            subtitle="Traditional silhouettes and modern drops, finished in champagne gold."
            items={earringsCollection}
            columns={3}
          />

          <CollectionGallery
            id="bangles"
            eyebrow="Bangles & Kadas"
            title="Wrists Worth Adoring"
            subtitle="Antique kadas, daily-wear bangles and bridal sets in luxe gold covering."
            items={banglesCollection}
            columns={3}
            tone="maroon"
          />

          <CollectionGallery
            id="featured"
            eyebrow="Featured"
            title="Editor's Picks"
            subtitle="A curated shelf of pieces our customers love most this season."
            items={featuredProducts}
            columns={4}
          />

          <CollectionGallery
            id="new-arrivals"
            eyebrow="Just In"
            title="New Arrivals"
            subtitle="Fresh designs added to the boutique this week."
            items={newArrivalsCollection}
            columns={4}
            tone="maroon"
          />

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
