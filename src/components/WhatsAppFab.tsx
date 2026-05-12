import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/products";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20AVS%20Kollam%2C%20I'd%20like%20to%20enquire%20about%20your%20jewellery.`}
      target="_blank"
      rel="noreferrer"
      className="animate-pulse-glow fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-cocoa-deep shadow-gold-glow transition-transform hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-champagne/40" />
    </a>
  );
}
