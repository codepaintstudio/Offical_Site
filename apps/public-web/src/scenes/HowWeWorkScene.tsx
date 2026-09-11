import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, ScrollTrigger, COLORS } from "../lib/gsap";
import { WORK_STAGES, DOC_CATEGORIES, KNOWLEDGE_TOTAL } from "../data/content";

const NODE_PCTS = [12.5, 37.5, 62.5, 87.5];

/**
 * 03 / HOW WE WORK — Standardized 4-milestone engineering timeline
 * with perfectly aligned nodes, structured stage cards, and knowledge base grid.
 */
export function HowWeWorkScene() {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const rail = railRef.current;
      const mover = moverRef.current;
      if (!root || !rail || !mover) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          all: "(min-width: 0px)",
          desktop: "(min-width: 1024px) and (pointer: fine)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduced } = ctx.conditions as { desktop: boolean; reduced: boolean };
          if (!desktop || reduced || prefersReduced()) {
            const descs = root.querySelectorAll<HTMLElement>("[data-stage-desc]");
            gsap.set(descs, { position: "static", autoAlpha: 1, y: 0, marginBottom: 16 });
            const panel = root.querySelector<HTMLElement>("[data-reader-panel]");
            if (panel) gsap.set(panel, { height: "auto" });
            if (!reduced && !prefersReduced()) {
              gsap.fromTo(
                descs,
                { y: 24, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.55,
                  ease: "power3.out",
                  stagger: 0.12,
                  scrollTrigger: { trigger: root, start: "top 82%", once: true },
                },
              );
            }
            return;
          }

          const nodes = gsap.utils.toArray<HTMLElement>("[data-stage-node]", rail);
          const descs = gsap.utils.toArray<HTMLElement>("[data-stage-desc]", root);

          const nodeX = (i: number) => {
            const r = rail.getBoundingClientRect();
            return (NODE_PCTS[i] / 100) * r.width - mover.offsetWidth / 2;
          };

          gsap.set(descs, { autoAlpha: 0 });
          gsap.set(descs[0], { autoAlpha: 1 });
          gsap.set(mover, { x: () => nodeX(0) });

          const panel = root.querySelector<HTMLElement>("[data-reader-panel]");
          const fitPanel = () => {
            if (!panel) return;
            let max = 0;
            for (const d of descs) max = Math.max(max, d.offsetHeight);
            if (max > 0) gsap.set(panel, { height: max });
          };
          fitPanel();

          let raf = 0;
          let disposed = false;
          const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
              if (disposed) return;
              fitPanel();
              ScrollTrigger.refresh();
            });
          };
          window.addEventListener("resize", onResize);
          document.fonts?.ready
            .then(() => {
              if (disposed) return;
              fitPanel();
              ScrollTrigger.refresh();
            })
            .catch(() => undefined);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=280%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          WORK_STAGES.forEach((_, i) => {
            if (i > 0) {
              tl.to(mover, { x: () => nodeX(i), duration: 1, ease: "power1.inOut" }, i);
              tl.to(descs[i - 1], { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.in" }, i);
              tl.fromTo(
                descs[i],
                { autoAlpha: 0, y: 24 },
                { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
                i + 0.3,
              );
            }
            // node emphasis
            tl.to(
              nodes[i],
              { scale: 1.5, backgroundColor: COLORS.signal, duration: 0.25 },
              i + 0.05,
            );
            if (i > 0) {
              tl.to(
                nodes[i - 1],
                { scale: 1, backgroundColor: COLORS.ash, duration: 0.25 },
                i + 0.05,
              );
            }
            // label highlight
            tl.to(root.querySelector(`[data-stage-label="${i}"]`), { color: COLORS.ink, duration: 0.2 }, i + 0.05);
            if (i > 0) {
              tl.to(root.querySelector(`[data-stage-label="${i - 1}"]`), { color: COLORS.ash, duration: 0.2 }, i + 0.05);
            }
          });

          tl.to({}, { duration: 0.6 });

          return () => {
            disposed = true;
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            tl.scrollTrigger?.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="scene-how"
      aria-label="研发体系与工作机制"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-[12vh]"
      style={{ backgroundColor: COLORS.bone }}
    >
      <div className="app-container">

        {/* Section Header: 12-column grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="t-scene text-[#0A0A0A]">
              标准化工程研发体系，
              <br />
              构建扎实<span style={{ color: COLORS.pine }}>工程素养</span>。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="t-body text-[#0A0A0A]/70">
              从代码规范、分支模型到真实业务交付，团队以严格的代码审查（Code Review）流程、高标准测试与资深导师一对一带教，系统化保障工程素质成长。
            </p>
          </div>
        </div>

        {/* Desktop Rail: 4 Milestones perfectly spaced at 12.5%, 37.5%, 62.5%, 87.5% */}
        <div ref={railRef} className="relative mt-[8vh] hidden h-[20vh] lg:block">
          <div
            aria-hidden="true"
            className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2"
            style={{ backgroundColor: "rgba(10,10,10,0.15)" }}
          />
          {/* Mover Disc */}
          <div
            ref={moverRef}
            aria-hidden="true"
            className="absolute top-1/2 left-0 z-10 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-[#0A0A0A] shadow-md will-change-transform"
            style={{ backgroundColor: COLORS.signal }}
          />
          {/* Milestone Nodes */}
          {WORK_STAGES.map((s, i) => (
            <div
              key={s.title}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${NODE_PCTS[i]}%` }}
            >
              <div
                data-stage-node
                className="h-6 w-6 -translate-x-1/2 rounded-full border-2 border-[#0A0A0A] transition-colors"
                style={{ backgroundColor: i === 0 ? COLORS.signal : COLORS.ash }}
              />
              <div className="absolute top-8 -translate-x-1/2 whitespace-nowrap text-center">
                <span
                  data-stage-label={i}
                  className="text-base font-bold tracking-tight"
                  style={{ color: i === 0 ? COLORS.ink : COLORS.ash }}
                >
                  {s.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reader Panel: Desktop shows active stage in formal card, mobile stacks all */}
        <div data-reader-panel className="relative mt-[6vh] min-h-[140px] w-full">
          {WORK_STAGES.map((s, i) => (
            <div
              key={s.title}
              data-stage-desc={i}
              className="formal-card absolute inset-x-0 top-0 p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold text-[#0A0A0A] sm:text-xl">
                {s.title}
              </h3>
              <p className="t-body mt-4 text-sm leading-relaxed text-[#0A0A0A]/75 sm:text-base">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Knowledge Base Asset Banner */}
        <div className="mt-[8vh] border-t border-[#0A0A0A]/20 pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono2 text-2xl font-black text-[#173D22]">
                {KNOWLEDGE_TOTAL}
              </span>
              <p className="text-sm font-medium text-[#0A0A0A]/70">
                篇深度技术文档与工程沉淀 · 飞书知识库持续更新
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {DOC_CATEGORIES.map((d) => (
                <span
                  key={d.name}
                  className="tech-pill text-xs font-medium text-[#0A0A0A]/75"
                >
                  {d.name} <strong className="ml-1 text-[#173D22]">{d.count}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
