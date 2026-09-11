import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReduced, COLORS } from "../../lib/gsap";
import { SCENES } from "../../data/content";

/**
 * Standardized navigation chrome.
 * Fixed top bar aligned to `app-container`, ensuring logo and menu button
 * perfectly align with the left/right safe area of the content below.
 */
export function Nav() {
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const animating = useRef(false);
  const menuXTo = useRef<((value: number) => void) | null>(null);

  const toggle = (next?: boolean) => {
    const target = next ?? !open;
    if (animating.current || target === open) return;
    const overlay = overlayRef.current;
    if (!overlay) {
      setOpen(target);
      return;
    }
    if (prefersReduced()) {
      setOpen(target);
      gsap.set(overlay, {
        clipPath: target ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        visibility: target ? "visible" : "hidden",
      });
      gsap.set(listRef.current?.children ?? [], { yPercent: 0, x: 0 });
      return;
    }
    animating.current = true;
    if (target) {
      setOpen(true);
      gsap
        .timeline({ onComplete: () => (animating.current = false) })
        .set(overlay, { visibility: "visible" }, 0)
        .set(listRef.current?.children ?? [], { x: 0 }, 0)
        .fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" },
          0,
        )
        .fromTo(
          listRef.current?.children ?? [],
          { yPercent: 125 },
          { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.015 },
          0,
        );
    } else {
      gsap
        .timeline({
          onComplete: () => {
            setOpen(false);
            gsap.set(overlay, { visibility: "hidden" });
            gsap.set(listRef.current?.children ?? [], { x: 0 });
            animating.current = false;
          },
        })
        .to(
          listRef.current?.children ?? [],
          {
            yPercent: -125,
            duration: 0.45,
            ease: "power2.in",
            stagger: 0.015,
          },
          0,
        )
        .to(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "expo.inOut" },
          0,
        );
    }
  };

  const goTo = (id: string) => {
    const delay = open && !prefersReduced() ? 500 : 0;
    toggle(false);
    window.setTimeout(() => {
      const el = document.getElementById(`scene-${id}`);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, y);
      ScrollTrigger.update();
    }, delay);
  };

  /* slight horizontal drift of menu items following mouse x */
  const onMenuMove = (e: React.PointerEvent) => {
    if (prefersReduced() || !listRef.current) return;
    const ratio = e.clientX / window.innerWidth - 0.5;
    menuXTo.current ??= gsap.quickTo(listRef.current.children, "x", {
      duration: 0.6,
      ease: "power2.out",
    });
    menuXTo.current(ratio * 36);
  };

  useGSAP(
    () => {
      if (!open) {
        menuXTo.current = null;
        return;
      }
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggle(false);
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        menuXTo.current = null;
      };
    },
    { dependencies: [open], scope: rootRef },
  );


  return (
    <div ref={rootRef}>
      <style>{`@keyframes nav-dot-bounce{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}.nav-dot-bounce{animation:nav-dot-bounce 1.6s ease-in-out infinite;will-change:transform}@media (prefers-reduced-motion:reduce){.nav-dot-bounce{animation:none}}`}</style>
      {/* Aligned Top Header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] py-6">
        <div className="app-container flex items-start justify-between">
          <a
            href="#scene-intro"
            onClick={(e) => {
              e.preventDefault();
              goTo("intro");
            }}
            className="pointer-events-auto block bg-[#0A0A0A] px-4 py-2 text-sm font-bold tracking-wide text-[#F4F4EE]"
            data-cursor="顶部"
          >
            CodePaint Studio<span className="text-[#FFD900]">.</span>
          </a>

          <button
            type="button"
            onClick={() => toggle()}
            aria-expanded={open}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD900]"
          >
            <span
              aria-hidden="true"
              className={
                open
                  ? "block h-3 w-3 rounded-full bg-[#FFD900]"
                  : "nav-dot-bounce block h-3 w-3 rounded-full bg-[#FFD900]"
              }
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Ink Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[85] flex flex-col justify-center"
        style={{
          backgroundColor: COLORS.ink,
          clipPath: "inset(0% 0% 100% 0%)",
          visibility: "hidden",
        }}
        onPointerMove={onMenuMove}
        aria-hidden={!open}
      >
        <nav className="app-container">
          <div ref={listRef} className="flex flex-col gap-2">
            {SCENES.map((s) => (
              <div key={s.id} className="mask-wrap">
                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  data-cursor="前往"
                  className="group flex w-full items-baseline gap-6 text-left"
                  tabIndex={open ? 0 : -1}
                >
                  <span className="t-menu text-white transition-colors duration-300 group-hover:text-[#FFD900]">
                    {s.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
