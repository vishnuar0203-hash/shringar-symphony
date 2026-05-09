export function Marquee() {
  const items = [
    "✦ Free shipping across India",
    "✦ Lifetime polish promise",
    "✦ WhatsApp order in 2 minutes",
    "✦ Bridal customisation available",
    "✦ Trusted by 10,000+ South Indian brides",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-champagne/20 bg-cocoa-deep py-3">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-champagne">
        {loop.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
