"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const slideIn = (delay: number) => ({
  initial: { opacity: 0, x: 32, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  transition: { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export default function HeroVisual() {
  return (
    <motion.div className="hero-visual-wrap" {...slideIn(0.2)}>
      <div className="hero-visual-glow" aria-hidden="true" />
      <div className="hero-visual-dots" aria-hidden="true" />

      <motion.div className="hero-visual-card" {...slideIn(0.3)}>
        <div className="hero-visual-inner">
          <Image
            src="/passport size photo 1.jpg"
            alt="Mominul Islam Sharon"
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 420px"
            className="hero-visual-photo"
          />
          <div className="hero-visual-photo-overlay" aria-hidden="true" />
        </div>
      </motion.div>

      <motion.div className="hero-badge hero-badge--work" {...slideIn(0.5)}>
        <span className="hero-badge-icon" aria-hidden="true">
          🚀
        </span>
        <div>
          <div className="hero-badge-title">Open to work</div>
          <div className="hero-badge-sub">Remote friendly</div>
        </div>
      </motion.div>

      <motion.div className="hero-badge hero-badge--mern" {...slideIn(0.55)}>
        <div className="hero-badge-mern-title">MERN Stack</div>
        <div className="hero-badge-sub">Full Stack</div>
      </motion.div>
    </motion.div>
  );
}
