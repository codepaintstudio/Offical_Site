import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP, prefersReduced, isTouch } from "../../lib/gsap";

/**
 * Custom cursor: 8px ink dot; grows to a 72px labelled circle over
 * [data-cursor] elements. Driven by gsap.quickTo — no perceivable lag.
 * Disabled on touch devices / reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!prefersReduced() && !isTouch());
  }, []);

  useGSAP(
    () => {
      const dot = dotRef.current;
      if (!dot || !enabled) return;

      document.documentElement.classList.add("has-cursor");
      gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

      const xTo = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onOver = (e: PointerEvent) => {
        const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
        const next = target ? target.getAttribute("data-cursor") || "打开" : "";
        setLabel((prev) => (prev === next ? prev : next));
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });

      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
      };
    },
    { dependencies: [enabled] },
  );

  useGSAP(
    () => {
      const dot = dotRef.current;
      if (!dot || !enabled) return;
      const active = label !== "";
      gsap.to(dot, {
        width: active ? 76 : 8,
        height: active ? 76 : 8,
        backgroundColor: active ? "#FFD900" : "#0A0A0A",
        duration: 0.3,
        ease: "power3.out",
      });
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.6,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [label, enabled] },
  );

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full"
      style={{ width: 8, height: 8, backgroundColor: "#0A0A0A" }}
    >
      <span
        ref={labelRef}
        className="font-mono2 text-[11px] font-bold tracking-wider whitespace-nowrap text-[#0A0A0A] uppercase opacity-0"
      >
        {label}
      </span>
    </div>
  );
}
