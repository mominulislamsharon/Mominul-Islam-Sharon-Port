"use client";

import { motion, Variants } from "framer-motion";

const skills = [
  { icon: "⚛️", name: "React", level: 90 },
  { icon: "▲", name: "Next.js", level: 85 },
  { icon: "🔷", name: "TypeScript", level: 80 },
  { icon: "🟢", name: "Node.js", level: 85 },
  { icon: "🍃", name: "MongoDB", level: 80 },
  { icon: "💜", name: "Redux", level: 75 },
  { icon: "🎨", name: "Tailwind", level: 90 },
  { icon: "🟡", name: "JavaScript", level: 88 },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const inViewOnce = { once: true, amount: 0.12 as const };

export default function SkillsSection() {
  return (
    <section className="skills-section">
      <motion.p
        className="skills-section__tag"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        expertise
      </motion.p>
      <motion.h2
        className="skills-section__title"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        Skills & Technologies
      </motion.h2>
      <motion.p
        className="skills-section__subtitle"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        Technologies I work with daily
      </motion.p>

      <motion.div
        className="skills-section__grid"
        variants={gridStagger}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-card"
            variants={cardMotion}
            whileHover={{
              y: -4,
              borderColor: "rgba(124,58,237,0.45)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <span className="skill-card__icon">{s.icon}</span>
            <span className="skill-card__name">{s.name}</span>
            <div className="skill-card__bar-track">
              <motion.div
                className="skill-card__bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + i * 0.05,
                  ease: "easeOut" as any,
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
