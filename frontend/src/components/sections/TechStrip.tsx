"use client";

import { useEffect, useRef, useState } from "react";

const techs = [
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Redux", color: "#764ABC" },
  { name: "Node.js", color: "#339933" },
  { name: "Express", color: "#888888" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Mongoose", color: "#AA4444" },
  { name: "REST API", color: "#22D3EE" },
  { name: "Git", color: "#F05032" },
];

function TechItems({ copyIndex }: { copyIndex: number }) {
  return (
    <>
      {techs.map((t) => (
        <div key={`${copyIndex}-${t.name}`} className="tech-strip-item">
          <span
            className="tech-strip-dot"
            style={{ background: t.color }}
            aria-hidden="true"
          />
          {t.name}
        </div>
      ))}
    </>
  );
}

export default function TechStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [copyCount, setCopyCount] = useState(2);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const first = firstSetRef.current;
    if (!track || !first) return;

    const update = () => {
      const sets = track.querySelectorAll<HTMLElement>(".tech-strip-set");
      if (sets.length < 2) return;

      const loopWidth = sets[1].offsetLeft - sets[0].offsetLeft;
      if (loopWidth <= 0) return;

      track.style.setProperty("--marquee-width", `${loopWidth}px`);
      const seconds = Math.max(20, loopWidth / 70);
      track.style.setProperty("--marquee-duration", `${seconds}s`);

      const viewport = window.innerWidth;
      const needed = Math.max(2, Math.ceil(viewport / loopWidth) + 2);
      setCopyCount((prev) => (prev === needed ? prev : needed));
      setReady(true);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="tech-strip" aria-label="Technologies">
      <div
        className="tech-strip-fade tech-strip-fade--left"
        aria-hidden="true"
      />
      <div
        className="tech-strip-fade tech-strip-fade--right"
        aria-hidden="true"
      />
      <div
        ref={trackRef}
        className={`tech-strip-track${ready ? " tech-strip-track--ready" : ""}`}
      >
        {Array.from({ length: copyCount }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? firstSetRef : undefined}
            className="tech-strip-set"
            aria-hidden={i > 0 ? true : undefined}
          >
            <TechItems copyIndex={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
