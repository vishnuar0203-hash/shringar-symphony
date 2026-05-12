import { type ReactNode, type CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";

type Variant = "up" | "fade" | "left" | "right" | "scale" | "blur";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useReveal<HTMLDivElement>();
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  const Comp = Tag as any;
  return (
    <Comp ref={ref} style={style} className={`reveal reveal-${variant} ${className}`}>
      {children}
    </Comp>
  );
}
