import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReduced, COLORS } from "../lib/gsap";
import { JOIN_STEPS, FOOTER_LINKS, openApply } from "../data/content";

/**
 * 06 / JOIN — three oversized clickable zones that expand on hover and
 * unfold their action on click. Ends with a full-bleed signal-yellow
 * mail CTA whose hover floods the footer.
 */
export function JoinScene() {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [openZone, setOpenZone] = useState<number | null>(null);
  const [flood, setFlood] = useState(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReduced()) return;
      gsap.fromTo(
        root.querySelectorAll("[data-join-line]"),
        { yPercent: 125 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: "top 65%", once: true },
        },
      );
      gsap.fromTo(
        root.querySelectorAll("[data-join-zone]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.querySelector("[data-join-zones]"), start: "top 80%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="scene-join"
      aria-label="加入团队"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: COLORS.bone }}
    >
      <div className="app-container pt-[14vh]">
        <h2 className="t-hero text-[#0A0A0A]">
          <span className="mask-wrap">
            <span data-join-line className="mask-inner">
              加入团队，
            </span>
          </span>
          <span className="mask-wrap">
            <span data-join-line className="mask-inner">
              共同打造
            </span>
          </span>
          <span className="mask-wrap">
            <span data-join-line className="mask-inner">
              可靠
              <span className="relative inline-block px-[0.08em]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-0.06em] top-[0.04em] bottom-[-0.06em]"
                  style={{ backgroundColor: COLORS.signal }}
                />
                <span className="relative">工程成果</span>
              </span>
              。
            </span>
          </span>
        </h2>
      </div>

      {/* three expanding zones */}
      <div
        data-join-zones
        className="app-container mt-[7vh] flex flex-1 flex-col gap-[2px] lg:flex-row lg:items-stretch"
        onMouseLeave={() => setHovered(null)}
      >
        {JOIN_STEPS.map((s, i) => {
          const expanded = hovered === i || openZone === i;
          return (
            <div
              key={s.title}
              data-join-zone
              role="button"
              tabIndex={0}
              aria-expanded={openZone === i}
              data-cursor={openZone === i ? "收起" : "展开"}
              onMouseEnter={() => setHovered(i)}
              onClick={() => setOpenZone(openZone === i ? null : i)}
              onKeyDown={(e) => e.key === "Enter" && setOpenZone(openZone === i ? null : i)}
              className="relative flex min-h-[180px] min-w-0 flex-col justify-between overflow-hidden border-2 border-[#0A0A0A] p-6 transition-[flex-grow,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-[300px]"
              style={{
                flexGrow: expanded ? 2.4 : 1,
                flexBasis: 0,
                backgroundColor: openZone === i ? COLORS.ink : expanded ? COLORS.paper : "transparent",
                color: openZone === i ? COLORS.bone : COLORS.ink,
              }}
            >
              <div className="flex items-start justify-end">
                <span aria-hidden="true" className="text-2xl leading-none">
                  {openZone === i ? "−" : "+"}
                </span>
              </div>

              <div>
                <h3
                  className="font-black tracking-tight"
                  style={{ fontSize: "clamp(24px, 2.4vw, 40px)", lineHeight: 1.05 }}
                >
                  {s.title}
                </h3>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    gridTemplateRows: expanded ? "1fr" : "0fr",
                    opacity: expanded ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="t-body mt-4 max-w-[420px]"
                      style={{ color: openZone === i ? "rgba(244,244,238,0.7)" : "rgba(10,10,10,0.65)" }}
                    >
                      {s.desc}
                    </p>
                    {s.action?.href && (
                      <a
                        href={s.action.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="前往 ↗"
                        onClick={(e) => e.stopPropagation()}
                        className="t-aux mt-4 inline-block font-bold underline underline-offset-8 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1"
                      >
                        {s.action.label} ↗
                      </a>
                    )}
                    {s.action?.mailto && (
                      <button
                        type="button"
                        data-cursor="发送"
                        onClick={(e) => {
                          e.stopPropagation();
                          openApply();
                        }}
                        className="t-aux mt-4 inline-block font-bold underline underline-offset-8 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1"
                        style={{ color: COLORS.signal }}
                      >
                        {s.action.label} ↗
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* giant mail CTA + footer with yellow flood */}
      <div className="app-container relative mt-[7vh]">
        {/* flood layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            backgroundColor: COLORS.signal,
            transform: flood ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top center",
          }}
        />
        <div className="relative">
          <button
            type="button"
            onClick={openApply}
            onMouseEnter={() => setFlood(true)}
            onMouseLeave={() => setFlood(false)}
            data-cursor="发送 ↗"
            className="flex w-full items-center justify-between border-t-2 border-[#0A0A0A] text-left"
            style={{ minHeight: "clamp(100px, 14vh, 140px)" }}
          >
            <span
              className="font-black tracking-tight text-[#0A0A0A]"
              style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1 }}
            >
              发起入队申请
            </span>
            <span
              aria-hidden="true"
              className="font-black text-[#0A0A0A] transition-transform duration-300"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                transform: flood ? "translate(8px, -8px)" : "translate(0,0)",
              }}
            >
              ↗
            </span>
          </button>

          <footer className="flex flex-col items-start justify-between gap-4 border-t border-[#0A0A0A]/20 py-7 text-[#0A0A0A] sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold">CodePaint Studio · 高校学生软件工程工作室</p>
              <p className="t-aux mt-1 text-[#0A0A0A]/55">
                专注于将创意转化为可靠工程成果的技术团队 · 中国 · 成都
              </p>
            </div>
            <div className="flex items-baseline gap-6">
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="↗"
                  className="t-aux font-medium underline-offset-4 transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5 hover:underline"
                >
                  {l.label} ↗
                </a>
              ))}
              <span className="t-aux font-mono2 text-[#0A0A0A]/40">
                © {new Date().getFullYear()}
              </span>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
