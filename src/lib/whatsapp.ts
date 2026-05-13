export const WHATSAPP_NUMBER = "919443693606";
export const BUSINESS_NAME = "AVS Kollam Gold Covering";

export function inquiryUrl(opts: {
  productCode?: string;
  productName?: string;
  price?: number | null;
  offerPrice?: number | null;
}) {
  const lines = [`Hi ${BUSINESS_NAME} ✨`, ""];
  if (opts.productName) {
    lines.push(`I'm interested in this product:`);
    lines.push(`• Name: ${opts.productName}`);
    if (opts.productCode) lines.push(`• Code: ${opts.productCode}`);
    if (opts.offerPrice ?? opts.price)
      lines.push(`• Price: ₹ ${(opts.offerPrice ?? opts.price)?.toLocaleString("en-IN")}`);
    lines.push("");
    lines.push("Please share more details and availability.");
  } else {
    lines.push("I'd like to enquire about your jewellery.");
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function shareUrl(productCode: string, productName: string) {
  const text = `Look at this beautiful piece from ${BUSINESS_NAME}: ${productName} (Code ${productCode})`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function formatPrice(value: number | null | undefined) {
  if (value == null) return "Price on request";
  return `₹ ${Number(value).toLocaleString("en-IN")}`;
}
