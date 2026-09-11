import { useRef } from "react";
import { gsap, useGSAP, prefersReduced, COLORS } from "../lib/gsap";
import { PROJECTS, type Project } from "../data/content";

type PanelSkin = {
  bg: string;
  fg: string;
  dim: string;
  accent: string;
};

/** Editorial panels alternate opaque black/white/gray surfaces.
 *  Opacity carries hierarchy; yellow/green accents survive only
 *  as small status dots. */
const SKINS: PanelSkin[] = [
  { bg: COLORS.bone, fg: COLORS.ink, dim: "rgba(10,10,10,0.65)", accent: COLORS.signal },
  { bg: COLORS.ink, fg: COLORS.bone, dim: "rgba(244,244,238,0.65)", accent: COLORS.signal },
  { bg: COLORS.paper, fg: COLORS.ink, dim: "rgba(10,10,10,0.65)", accent: COLORS.acid },
  { bg: "#1C1C1C", fg: COLORS.bone, dim: "rgba(244,244,238,0.65)", accent: COLORS.acid },
];

function Panel({ p, i }: { p: Project; i: number }) {
  const skin = SKINS[i % SKINS.length];
  return (
    <article
      data-panel
      className="relative h-auto min-h-[78svh] w-screen shrink-0 lg:h-[100svh] lg:w-[86vw]"
      style={{ backgroundColor: skin.bg, color: skin.fg }}
    >
      <div className="app-container flex h-full flex-col justify-between pt-[13vh] pb-[9vh]">
        <div className="my-auto max-w-[880px]">
          <h3
            className={`whitespace-pre-line ${
              p.name.length > 10
                ? "text-[clamp(32px,4.5vw,72px)] font-black leading-[1.05]"
                : "t-project"
            }`}
            style={{ color: skin.fg }}
          >
            {p.name}
          </h3>
          {p.nameZh && (
            <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl" style={{ color: skin.fg }}>
              {p.nameZh}
            </p>
          )}
          <p className="t-body mt-5 max-w-[560px] text-sm leading-relaxed sm:text-base" style={{ color: skin.dim }}>
            {p.desc}
          </p>
          <p className="t-aux mt-6 max-w-[560px] leading-relaxed tracking-wide" style={{ color: skin.dim }}>
            {p.features.join(" / ")}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4" style={{ borderColor: "rgba(128,128,128,0.2)" }}>
          <div className="flex flex-wrap items-center gap-6">
            {p.status.map((s) => (
              <span key={s} className="t-aux flex items-center gap-2" style={{ color: skin.dim }}>
                <span className="h-2 w-2" style={{ backgroundColor: skin.accent }} />
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" data-cursor="查看 ↗" className="t-aux font-bold tracking-wide underline underline-offset-8 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1" style={{ color: skin.fg }}>
                {p.liveLabel} ↗
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" data-cursor="查看 ↗" className="t-aux font-bold tracking-wide underline underline-offset-8 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1" style={{ color: skin.fg }}>
                GitHub 仓库 ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * 02 / PROJECTS — Editorial horizontal sequence, no cards or visuals.
 * Grid-aligned layout, precise container bounds, and clean responsive fallback.
 */
export function ProjectsScene() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          all: "(min-width: 0px)",
          desktop: "(min-width: 1024px) and (pointer: fine)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduced } = ctx.conditions as { desktop: boolean; reduced: boolean };
          // 静止偏好：纵向堆叠保证可读，不播进入动画
          if (reduced || prefersReduced()) {
            track.style.display = "block";
            track.style.width = "100%";
            return () => {
              track.style.removeProperty("display");
              track.style.removeProperty("width");
            };
          }
          if (!desktop) {
            // 移动端纵向堆叠；每个 panel 进入视口时各自播一次，避免整组提前播完
            track.style.display = "block";
            track.style.width = "100%";
            const tweens = gsap.utils
              .toArray<HTMLElement>("[data-panel]", track)
              .map((panel) =>
                gsap.fromTo(
                  panel,
                  { y: 28, autoAlpha: 0 },
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: { trigger: panel, start: "top 88%", once: true },
                  },
                ),
              );
            return () => {
              track.style.removeProperty("display");
              track.style.removeProperty("width");
              tweens.forEach((t) => t.scrollTrigger?.kill());
            };
          }

          const distance = () => track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              fastScrollEnd: true,
            },
          });

          return () => tween.scrollTrigger?.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="scene-projects"
      aria-label="代表工程"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: COLORS.bone }}
    >
      <div ref={trackRef} className="flex w-max">
        {PROJECTS.map((p, i) => (
          <Panel key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
