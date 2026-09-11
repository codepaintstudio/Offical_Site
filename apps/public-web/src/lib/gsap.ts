import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, Flip, SplitText, useGSAP);

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches &&
  !isTouch();

/** Fully animated experience only on non-touch desktop without reduced motion. */
export const fullMotion = () => !prefersReduced() && !isTouch();

export const COLORS = {
  ink: "#0A0A0A",
  bone: "#F4F4EE",
  paper: "#FFFFFF",
  signal: "#FFD900",
  acid: "#B8FF27",
  pine: "#173D22",
  ash: "#A7A7A0",
} as const;

export { gsap, ScrollTrigger, ScrollToPlugin, Observer, Flip, SplitText, useGSAP };
