import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReduced, COLORS } from "../lib/gsap";
import { MENTORS } from "../data/content";

/**
 * 04 / PEOPLE — interactive mentor index. Name list on the left, structured
 * dossier card on the right, an oversized surname looming behind.
 * Hover (desktop) / tap (touch) switches the person with a horizontal wipe.
 */
export function PeopleScene() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const switching = useRef(false);

  const select = (i: number) => {
    if (i === active || switching.current) return;
    const root = rootRef.current;
    if (!root || prefersReduced()) {
      setActive(i);
      return;
    }
    switching.current = true;
    const detail = root.querySelector("[data-person-detail]");
    const surname = root.querySelector("[data-person-surname]");
    gsap
      .timeline({ onComplete: () => (switching.current = false) })
      .to([detail, surname], {
        x: -28,
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.in",
      })
      .add(() => setActive(i))
      .fromTo(
        [detail, surname],
        { x: 36, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" },
      );
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReduced()) return;
      gsap.fromTo(
        root.querySelectorAll("[data-person-item]"),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        },
      );
    },
    { scope: rootRef },
  );

  const m = MENTORS[active];

  return (
    <section
      ref={rootRef}
      id="scene-people"
      aria-label="导师团队"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden py-[12vh]"
      style={{ backgroundColor: COLORS.bone }}
    >
      {/* looming surname */}
      <span
        data-person-surname
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 font-black select-none lg:block"
        style={{
          fontSize: "clamp(200px, 26vw, 420px)",
          lineHeight: 1,
          color: "rgba(10,10,10,0.05)",
        }}
      >
        {m.surname}
      </span>

      <div className="app-container relative z-10 w-full">
        {/* Section Header */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="t-scene text-[#0A0A0A] lg:col-span-7">
            双师型导师团队，
            <br />
            全程指导<span style={{ color: COLORS.pine }}>工程实战</span>。
          </h2>
          <p className="t-body max-w-[520px] text-[#0A0A0A]/70 lg:col-span-5">
            团队导师由具备企业工程经验的高校教师担任，贯通工程实践、学科竞赛与就业发展全过程。
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
          {/* name index */}
          <div className="lg:col-span-5">
            <ul className="flex flex-col">
              {MENTORS.map((mentor, i) => {
                const isActive = i === active;
                return (
                  <li key={mentor.id} data-person-item>
                    <button
                      type="button"
                      onMouseEnter={() => select(i)}
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      data-cursor="打开"
                      className="group flex w-full items-baseline gap-4 border-b border-[#0A0A0A]/15 py-4 text-left"
                    >
                      <span
                        className="font-black tracking-tight transition-colors duration-300"
                        style={{
                          fontSize: "clamp(30px, 3.8vw, 56px)",
                          color: isActive ? COLORS.ink : "rgba(10,10,10,0.35)",
                        }}
                      >
                        {mentor.name}
                      </span>
                      <span className="t-aux hidden font-medium text-[#0A0A0A]/50 md:inline">
                        {mentor.title}
                      </span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="ml-auto inline-block h-4 w-4"
                          style={{ backgroundColor: COLORS.signal }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* structured dossier card */}
          <div className="flex items-start lg:col-span-6 lg:col-start-7">
            <div data-person-detail key={m.id} className="formal-card w-full p-8 sm:p-10">
              <p className="t-aux font-mono2" style={{ color: COLORS.pine }}>
                {m.domain}
              </p>
              <h3 className="t-sub mt-3 text-[#0A0A0A]">
                {m.name}
                <span className="t-body ml-4 align-middle font-normal text-[#0A0A0A]/55">
                  {m.title}
                </span>
              </h3>

              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="t-aux text-[#0A0A0A]/40">教育与履历背景</dt>
                  <dd className="t-body mt-1 font-medium text-[#0A0A0A]/85">{m.pedigree}</dd>
                </div>
                <div>
                  <dt className="t-aux text-[#0A0A0A]/40">主导方向与专长</dt>
                  <dd className="t-body mt-1 font-medium" style={{ color: COLORS.pine }}>
                    {m.focus}
                  </dd>
                </div>
                <div>
                  <dt className="t-aux text-[#0A0A0A]/40">导师履历与育人成就</dt>
                  <dd className="t-body mt-1 max-w-[560px] text-[#0A0A0A]/70">{m.bio}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-[#0A0A0A]/10 pt-6">
                {m.tags.map((t) => (
                  <span key={t} className="tech-pill text-xs text-[#0A0A0A]/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
