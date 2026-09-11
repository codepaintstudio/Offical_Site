import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, COLORS } from "../lib/gsap";

/** Split a string into per-char masked spans (deterministic, React-safe). */
function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text} role="text">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="mask-char" aria-hidden="true">
          <span className="mask-inner" data-char>
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * 00 / INTRO — 100svh.
 * Standardized left-aligned layout with crisp baseline, formal positioning,
 * and elegant character entry animation.
 */
export function IntroScene() {
  const rootRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (prefersReduced()) {
        gsap.set(curtainRef.current, { display: "none" });
        return;
      }

      const chars = root.querySelectorAll("[data-char]");
      const meta = root.querySelectorAll("[data-fade-in]");

      gsap.set(chars, { yPercent: 120 });
      gsap.set(meta, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl
        // ink curtain opens
        .to(curtainRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.75,
          ease: "expo.inOut",
        })
        // characters assemble
        .to(chars, { yPercent: 0, duration: 0.85, stagger: 0.02 }, "-=0.3")
        // meta fades in
        .to(meta, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .set(curtainRef.current, { display: "none" });

      // subtle exit drift while scrolling away
      gsap.to(root.querySelector("[data-hero-content]"), {
        yPercent: -10,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="scene-intro"
      aria-label="首页"
      className="relative flex h-[100svh] w-full flex-col justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.bone }}
    >
      {/* intro curtain overlay */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40"
        style={{ backgroundColor: COLORS.ink }}
      />

      <div data-hero-content className="app-container relative z-10 flex h-full flex-col justify-between pt-[14vh] pb-[8vh]">

        {/* Aligned Headline */}
        <div className="my-auto">
          <h1
            data-hero-title
            className="t-hero text-[#0A0A0A]"
          >
            <span className="block">
              <Chars text="以工程敬畏之心，" />
            </span>
            <span className="block mt-2 sm:mt-3">
              <Chars text="将创意转化为可靠的" />
            </span>
            <span className="block mt-2 sm:mt-3">
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-0.04em] top-[0.06em] bottom-[-0.02em] -z-10"
                  style={{ backgroundColor: COLORS.signal }}
                />
                <Chars text="数字化生产级产品" />
              </span>
              <Chars text="。" />
            </span>
          </h1>

          <p data-fade-in className="t-body mt-6 max-w-[680px] text-[#0A0A0A]/70">
            CodePaint Studio 是由高校学生组成、专业教师指导的软件工程工作室。
            我们专注于全栈工程研发、系统交付与学科竞赛实践，以严谨的工程闭环创造可验证的真实价值。
          </p>
        </div>

      </div>
    </section>
  );
}
