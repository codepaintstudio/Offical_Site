import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, COLORS } from "../lib/gsap";
import { METRICS, PLACEMENTS, AWARDS } from "../data/content";

function Credits() {
  return (
    <div className="w-full">
      <p className="font-mono2 mt-0 text-sm font-bold uppercase tracking-[0.22em] text-[#F4F4EE]/60">部分企业录用去向</p>
      <div className="mt-4 border-t border-[#F4F4EE]/20">
        {PLACEMENTS.map((p) => (
          <div
            key={p.name}
            data-cursor="↗"
            className="row-sweep group grid grid-cols-12 items-baseline gap-3 border-b border-[#F4F4EE]/20 py-4 sm:py-5"
          >
            <span className="col-span-8 text-xl font-extrabold tracking-tight text-[#F4F4EE] transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-[#0A0A0A] sm:col-span-9 sm:text-3xl">
              {p.name}
            </span>
            <span className="t-aux col-span-4 text-right text-[#F4F4EE]/70 transition-[transform,color] duration-300 group-hover:-translate-x-4 group-hover:text-[#0A0A0A] sm:col-span-3">
              {p.meta}
            </span>
          </div>
        ))}
      </div>

      <p className="font-mono2 mt-10 text-sm font-bold uppercase tracking-[0.22em] text-[#F4F4EE]/60">学科竞赛获奖</p>
      <div className="mt-4 border-t border-[#F4F4EE]/20">
        {AWARDS.map((a) => (
          <div
            key={a.name}
            className="row-sweep group grid grid-cols-12 items-baseline gap-3 border-b border-[#F4F4EE]/20 py-4"
          >
            <span className="col-span-8 text-base font-bold tracking-tight text-[#F4F4EE] transition-colors duration-300 group-hover:text-[#0A0A0A] sm:text-xl">
              {a.name}
            </span>
            <span className="t-aux font-mono2 col-span-4 text-right text-[#F4F4EE]/70 transition-[transform,color] duration-300 group-hover:-translate-x-4 group-hover:text-[#0A0A0A]">
              国 {a.national} · 省 {a.provincial}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 05 / OUTCOME — the second climax. Ink-black pinned scene where the
 * giant metrics 7 / 4 / 17 take turns owning the whole viewport, then
 * dissolve into an editorial credits roll of placements and awards.
 */
export function OutcomeScene() {
  const rootRef = useRef<HTMLElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          all: "(min-width: 0px)",
          desktop: "(min-width: 1024px) and (pointer: fine)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduced } = ctx.conditions as { desktop: boolean; reduced: boolean };

          const n7 = root.querySelector("[data-num='7']");
          const n4 = root.querySelector("[data-num='4']");
          const n17 = root.querySelector("[data-num='17']");
          const l1 = root.querySelector("[data-nlabel='1']");
          const l2 = root.querySelector("[data-nlabel='2']");
          const l3 = root.querySelector("[data-nlabel='3']");
          const credits = root.querySelector("[data-credits]");

          if (!desktop || reduced || prefersReduced()) {
            if (fallbackRef.current) {
              fallbackRef.current.style.display = "block";
              const metricBlocks = Array.from(
                fallbackRef.current.firstElementChild?.children ?? [],
              ) as HTMLElement[];
              const creditsBlock = fallbackRef.current.lastElementChild as HTMLElement | null;
              if (!reduced && !prefersReduced()) {
                const mobileTl = gsap.timeline({
                  scrollTrigger: { trigger: root, start: "top 82%", once: true },
                });
                mobileTl.fromTo(
                  metricBlocks,
                  { y: 28, autoAlpha: 0 },
                  { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.12 },
                );
                if (creditsBlock) {
                  mobileTl.fromTo(
                    creditsBlock,
                    { y: 24, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
                    "-=0.1",
                  );
                }
              }
            }
            gsap.set([n7, n4, n17, l1, l2, l3], { display: "none" });
            gsap.set(credits, { display: "none" });
            return;
          }

          // 修复 Tailwind -translate 与 GSAP 矩阵解析冲突，分离百分比居中与像素位移
          gsap.set([n7, n4, n17], { xPercent: -50, yPercent: -50, x: 0, y: 0 });
          
          gsap.set(n7, { autoAlpha: 0 });
          gsap.set(n4, { y: () => window.innerHeight });
          gsap.set(n17, { x: () => window.innerWidth });
          gsap.set([l1, l2, l3], { autoAlpha: 0, y: 32 });
          gsap.set(credits, { autoAlpha: 0, y: 80 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=420%",
              pin: true,
              scrub: 0.9,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1) label first, then 7 enters and settles left
          tl.to(l1, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2)
            .fromTo(
              n7,
              { autoAlpha: 0, scale: 1.15 },
              { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
              0.5,
            )
            .to(n7, { x: -120, scale: 0.62, duration: 1 }, 1.1)

            // 2) 7 leaves, label first, then 4 rushes up from the bottom
            .to(n7, { autoAlpha: 0, x: -240, duration: 0.7 }, 2.3)
            .to(l1, { autoAlpha: 0, x: -60, duration: 0.7 }, 2.3)
            .to(l2, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.5)
            .to(n4, { y: 0, duration: 0.8, ease: "expo.out" }, 2.9)

            // 3) label first, then 17 sweeps across and covers everything
            .to(n4, { autoAlpha: 0, y: -200, duration: 0.7 }, 3.9)
            .to(l2, { autoAlpha: 0, y: -60, duration: 0.7 }, 3.9)
            .to(l3, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 4.1)
            .to(n17, { x: 0, duration: 0.9, ease: "expo.out" }, 4.5)

            // 4) numbers dissolve completely FIRST, then credits roll up (避免中间又有动画叠在一起)
            .to(n17, { autoAlpha: 0, scale: 1.15, duration: 0.6 }, 5.6)
            .to(l3, { autoAlpha: 0, duration: 0.5 }, 5.6)
            .to(
              credits,
              { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.inOut" },
              6.2,
            )
            .to({}, { duration: 0.8 });

          return () => tl.scrollTrigger?.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="scene-outcome"
      aria-label="育人成果与工程荣誉"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
      style={{ backgroundColor: COLORS.ink }}
    >
      {/* giant numbers */}
      {[
        { v: "7", c: COLORS.bone, attr: "7" },
        { v: "4", c: COLORS.signal, attr: "4" },
        { v: "17", c: COLORS.acid, attr: "17" },
      ].map((n) => (
        <span
          key={n.attr}
          data-num={n.attr}
          aria-hidden="true"
          className="t-giant absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none"
          style={{ color: n.c }}
        >
          {n.v}
        </span>
      ))}

      {/* number captions */}
      <div className="app-container pointer-events-none absolute inset-x-0 bottom-[16vh] z-10">
        <p data-nlabel="1" className="t-sub text-[#F4F4EE]">
          {METRICS[0].label}
          <span className="t-body mt-2 block font-normal text-[#F4F4EE]/55">
            {METRICS[0].desc}
          </span>
        </p>
      </div>
      <div className="app-container pointer-events-none absolute inset-x-0 bottom-[16vh] z-10">
        <p data-nlabel="2" className="t-sub text-[#F4F4EE]">
          {METRICS[1].label}
          <span className="t-body mt-2 block font-normal text-[#F4F4EE]/55">
            {METRICS[1].desc}
          </span>
        </p>
      </div>
      <div className="app-container pointer-events-none absolute inset-x-0 bottom-[16vh] z-10">
        <p data-nlabel="3" className="t-sub text-[#F4F4EE]">
          {METRICS[2].label}
          <span className="t-body mt-2 block font-normal text-[#F4F4EE]/55">
            {METRICS[2].desc}
          </span>
        </p>
      </div>

      {/* credits roll */}
      <div
        data-credits
        className="app-container relative z-10 w-full opacity-0 will-change-transform"
      >
        <Credits />
      </div>

      {/* static fallback (mobile / reduced motion) */}
      <div ref={fallbackRef} className="app-container relative z-10 hidden w-full py-[14vh]" style={{ display: "none" }}>
        <div className="mb-14 flex flex-wrap gap-x-14 gap-y-8">
          {METRICS.map((mtr) => (
            <div key={mtr.label}>
              <span className="t-body block text-[#F4F4EE]/70">{mtr.label}</span>
              <span className="t-aux mt-1 block text-[#F4F4EE]/50">{mtr.desc}</span>
              <span className="t-giant mt-2 block !text-[clamp(90px,18vw,180px)] text-[#F4F4EE]">
                {mtr.value}
                <span className="text-[0.35em] text-[#FFD900]">{mtr.suffix}</span>
              </span>
            </div>
          ))}
        </div>
        <Credits />
      </div>
    </section>
  );
}
