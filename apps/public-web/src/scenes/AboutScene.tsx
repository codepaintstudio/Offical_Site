import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, COLORS } from "../lib/gsap";
import { VALUES } from "../data/content";

/**
 * 01 / ABOUT — statement typography + structured value cards.
 * Lines slide in at different rates (scroll-linked parallax) so the
 * scene feels assembled rather than revealed; cards clip up in sequence.
 */
export function AboutScene() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReduced()) return;

      // statement lines assemble at different speeds
      gsap.utils.toArray<HTMLElement>("[data-about-line]", root).forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 60 + i * 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: `top ${82 - i * 6}%`,
              end: `top ${30 - i * 4}%`,
              scrub: 0.8,
            },
          },
        );
      });

      // value cards clip up
      gsap.fromTo(
        root.querySelectorAll("[data-value-card]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.querySelector("[data-values-grid]"), start: "top 78%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="scene-about"
      aria-label="关于团队"
      className="relative w-full overflow-hidden py-[16vh]"
      style={{ backgroundColor: COLORS.bone }}
    >
      <div className="app-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="t-scene text-[#0A0A0A] lg:col-span-7">
            <span data-about-line className="block">
              拒绝概念堆砌，
            </span>
            <span data-about-line className="block">
              专注<span style={{ color: COLORS.pine }}>生产级交付</span>。
            </span>
          </h2>
          <p data-about-line className="t-body max-w-[520px] text-[#0A0A0A]/75 lg:col-span-5">
            CodePaint Studio 由高校学生组成，并由专业教师提供工程与学术指导。
            我们坚持实事求是的工程作风，聚焦问题排查、系统架构与可靠交付。
          </p>
        </div>

        {/* values — structured card grid */}
        <div data-values-grid className="mt-[12vh] grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              data-value-card
              className="formal-card p-8"
            >
              <h3 className="text-xl font-bold tracking-tight text-[#0A0A0A]">{v.title}</h3>
              <p className="t-body mt-4 text-sm leading-relaxed text-[#0A0A0A]/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
