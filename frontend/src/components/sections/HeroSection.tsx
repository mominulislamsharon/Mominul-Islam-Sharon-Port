"use client";
import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import HeroVisual from "./HeroVisual";

const roles = [
  "MERN Developer",
  "Next.js Engineer",
  "React Specialist",
  "Backend Developer",
];

export default function HeroSection() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const ri = useRef(0);
  const ci = useRef(0);
  const del = useRef(false);

  useEffect(() => {
    function typewrite() {
      const cur = roles[ri.current];
      if (!del.current) {
        if (roleRef.current)
          roleRef.current.textContent = cur.slice(0, ci.current + 1);
        ci.current++;
        if (ci.current === cur.length) {
          del.current = true;
          setTimeout(typewrite, 1800);
          return;
        }
      } else {
        if (roleRef.current)
          roleRef.current.textContent = cur.slice(0, ci.current - 1);
        ci.current--;
        if (ci.current === 0) {
          del.current = false;
          ri.current = (ri.current + 1) % roles.length;
        }
      }
      setTimeout(typewrite, del.current ? 60 : 90);
    }
    typewrite();
  }, []);

  const fadeUp = (delay: number): Variants => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
  });

  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <motion.div
            {...fadeUp(0.1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 100,
              border: "1px solid rgba(124,58,237,0.3)",
              background: "rgba(124,58,237,0.08)",
              fontSize: 12,
              fontWeight: 500,
              color: "#A78BFA",
              marginBottom: 24,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--cyan)",
                display: "inline-block",
              }}
            />
            ⚡ Open to opportunities
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontSize: "clamp(38px,6vw,62px)",
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.04,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg,#F1F5F9 0%,#C4B5FD 40%,#7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mominul Islam
            </span>
            <br />
            <span style={{ color: "#F1F5F9" }}>Sharon</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 18,
              color: "var(--muted)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 400,
              flexWrap: "wrap",
            }}
          >
            Full Stack{" "}
            <span
              style={{ color: "var(--cyan)", fontWeight: 500 }}
              ref={roleRef}
            >
              MERN Developer
            </span>
            <span
              className="cursor-blink"
              style={{
                width: 2,
                height: 18,
                background: "var(--cyan)",
                display: "inline-block",
              }}
            />
          </motion.p>

          <motion.p
            {...fadeUp(0.4)}
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--muted)",
              maxWidth: 520,
              marginBottom: 32,
            }}
          >
            Building modern, scalable, and high-performance web applications.
            Focused on clean design, seamless user experience, and real-world
            problem solving.
          </motion.p>

          <motion.div
            {...fadeUp(0.5)}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Link
              href="/projects"
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                background: "var(--violet)",
                color: "#fff",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 32px rgba(124,58,237,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              ⚡ View Projects
            </Link>

            <a
              href="/resume.pdf"
              download
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                background: "transparent",
                color: "var(--text)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
              }}
            >
              ↓ Download Resume
            </a>
          </motion.div>
        </div>
        {/* HeroVisual */}
        <HeroVisual />
      </div>
    </section>
  );
}
