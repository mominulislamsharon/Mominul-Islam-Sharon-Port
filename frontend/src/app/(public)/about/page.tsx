"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiMonitor,
  FiDatabase,
  FiSettings,
  FiBriefcase,
  FiArrowRight,
} from "react-icons/fi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const inViewOnce = { once: true, amount: 0.15 as const };

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutHeroSection />
      <AboutIntroSection />
      <SkillsGridSection />
      <ExperienceTimelineSection />
    </div>
  );
}

function AboutHeroSection() {
  return (
    <section className="about-hero">
      <div className="about-hero__bg-glow" />
      <div className="about-hero__content">
        <motion.p
          className="about-section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          nice to meet you
        </motion.p>
        <motion.h1
          className="about-hero__title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          Hi, I&apos;m Mominul Islam Sharon.
        </motion.h1>
        <motion.p
          className="about-hero__subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          transition={{ delay: 0.1 }}
        >
          A passionate Full Stack MERN Developer crafting modern, scalable web
          applications with elegant digital solutions.
        </motion.p>
      </div>
    </section>
  );
}

function AboutIntroSection() {
  return (
    <section className="about-intro">
      <div className="about-intro__wrapper">
        <motion.div
          className="about-intro__card"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          <div className="about-intro__glow" aria-hidden="true" />

          <div className="about-intro__content">
            <h2 className="about-intro__card-title">My Journey</h2>
            <div className="about-intro__text-wrap">
              <p className="about-intro__text">
                I thrive on turning complex problems into elegant, intuitive web
                solutions. With a strong foundation in MongoDB, Express.js,
                React, and Node.js (The MERN Stack), I focus on architecting
                scalable and high-performance applications from the ground up.
              </p>
              <p className="about-intro__text">
                My journey in web development has been fueled by an endless
                curiosity and a commitment to delivering exceptional user
                experiences. Whether it&apos;s building pixel-perfect,
                responsive interfaces or designing robust APIs, I am dedicated
                to creating impactful digital products that make a real
                difference.
              </p>
            </div>

            <Link href="/contact" className="about-intro__cta">
              Let&apos;s build something great{" "}
              <FiArrowRight className="about-intro__cta-icon" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsGridSection() {
  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: <FiMonitor />,
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Redux Toolkit",
      ],
    },
    {
      title: "Backend & Database",
      icon: <FiDatabase />,
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "RESTful APIs",
        "GraphQL",
        "Authentication",
      ],
    },
    {
      title: "Tools & DevOps",
      icon: <FiSettings />,
      skills: ["Git", "GitHub", "Docker", "AWS", "Vercel"],
    },
  ];

  return (
    <section className="about-skills">
      <div className="about-section-head">
        <motion.p
          className="about-section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          expertise
        </motion.p>
        <motion.h2
          className="about-section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          Technical Stack
        </motion.h2>
        <motion.p
          className="about-section-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          The tools and technologies I use to bring ideas to life.
        </motion.p>
      </div>

      <motion.div
        className="about-skills__grid"
        variants={gridStagger}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            className="skill-category-card"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="skill-category__header">
              <div className="skill-category__icon">{category.icon}</div>
              <h3 className="skill-category__title">{category.title}</h3>
            </div>
            <div className="skill-category__tags">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ExperienceTimelineSection() {
  const experiences = [
    {
      year: "2026 - Present",
      title: "Full Stack Developer (Self-Directed)",
      company: "Independent Projects & Practice",
      description:
        "Intensively building advanced full-stack applications to solve real-world problems and mastering new technologies.",
      points: [
        "Developing scalable MERN applications with modern architectures.",
        "Creating highly interactive and responsive user interfaces.",
        "Optimizing performance and security for production environments.",
      ],
    },
    {
      year: "Oct 2025 - March 2026",
      title: "Web Developer",
      company: "Softvence Agency",
      description:
        "Contributed to professional projects at a tech agency, collaborating with teams to deliver industrial-standard client solutions.",
      points: [
        "Participated in industry-standard development workflows.",
        "Built robust and maintainable codebases for diverse clients.",
        "Gained hands-on experience in a professional software environment.",
      ],
    },
    {
      year: "2025",
      title: "Full Stack Web Development (Level 2)",
      company: "Programming Hero",
      description:
        "Specialized in the MERN stack through advanced training, deepening understanding of backend architecture and complex state management.",
      points: [
        "Mastered full-stack implementation with MongoDB, Node, and Express.",
        "Implemented secure authentication and RESTful API structures.",
        "Built multiple complex full-stack applications from scratch.",
      ],
    },
    {
      year: "2024",
      title: "Frontend Development (Level 1)",
      company: "Programming Hero",
      description:
        "Started the journey by mastering the core principles of web development and frontend technologies.",
      points: [
        "Mastered modern web design principles and responsive strategies.",
        "Built interactive and dynamic user interfaces with React.js.",
        "Established a solid foundation in programming logic and software engineering basics.",
      ],
    },
  ];

  return (
    <section className="about-experience">
      <div className="about-section-head">
        <motion.p
          className="about-section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          timeline
        </motion.p>
        <motion.h2
          className="about-section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          My Experience
        </motion.h2>
      </div>

      <motion.div
        className="experience-timeline"
        variants={gridStagger}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {experiences.map((exp, idx) => (
          <motion.article
            key={idx}
            className="experience-card"
            variants={fadeUp}
          >
            <div className="experience-card__icon-wrap">
              <FiBriefcase />
            </div>
            <div className="experience-card__content">
              <div className="experience-card__header">
                <div>
                  <h3 className="experience-card__title">{exp.title}</h3>
                  <p className="experience-card__company">{exp.company}</p>
                </div>
                <div className="experience-card__badge">{exp.year}</div>
              </div>
              <p className="experience-card__desc">{exp.description}</p>
              <ul className="experience-card__points">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
