import { useEffect } from "react";
import { ScrollTrigger } from "../../lib/gsap";
import { Nav } from "../../components/chrome/Nav";
import { Cursor } from "../../components/chrome/Cursor";
import { IntroScene } from "../../scenes/IntroScene";
import { AboutScene } from "../../scenes/AboutScene";
import { ProjectsScene } from "../../scenes/ProjectsScene";
import { HowWeWorkScene } from "../../scenes/HowWeWorkScene";
import { PeopleScene } from "../../scenes/PeopleScene";
import { OutcomeScene } from "../../scenes/OutcomeScene";
import { JoinScene } from "../../scenes/JoinScene";

export function CinematicHome() {
  // keep pin measurements honest across resizes / font loads
  useEffect(() => {
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    };
    window.addEventListener("resize", onResize);
    const fontReady = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts
      ?.ready;
    fontReady?.then(() => ScrollTrigger.refresh()).catch(() => undefined);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative w-full">
      <Cursor />
      <Nav />
      <main>
        <IntroScene />
        <AboutScene />
        <ProjectsScene />
        <HowWeWorkScene />
        <PeopleScene />
        <OutcomeScene />
        <JoinScene />
      </main>
    </div>
  );
}
