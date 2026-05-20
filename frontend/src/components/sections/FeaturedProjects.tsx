"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetFeaturedProjectsQuery } from "@/redux/features/projectApi";
import type { Project } from "@/redux/features/projectApi";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const gridStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const inViewOnce = { once: true, amount: 0.1 as const };

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="featured-project-card"
      variants={cardMotion}
      whileHover={{
        y: -6,
        borderColor: "rgba(124,58,237,0.4)",
        boxShadow: "0 20px 48px rgba(0,0,0,0.45)",
      }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <Link
        href={`/projects/${project._id}`}
        className="featured-project-card__link"
      >
        <div className="featured-project-card__thumb">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="featured-project-card__img"
            />
          ) : (
            <span className="featured-project-card__placeholder" aria-hidden>
              🚀
            </span>
          )}
          <div className="featured-project-card__thumb-overlay" aria-hidden />
        </div>

        <div className="featured-project-card__body">
          <h3 className="featured-project-card__title">{project.title}</h3>
          <p className="featured-project-card__desc">{project.description}</p>
          <div className="featured-project-card__tags">
            {project.techStack.map((t) => (
              <span key={t} className="featured-project-card__tag">
                {t}
              </span>
            ))}
          </div>
          <div className="featured-project-card__actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="featured-project-card__btn featured-project-card__btn--primary"
                onClick={(e) => e.stopPropagation()}
              >
                ↗ Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="featured-project-card__btn featured-project-card__btn--ghost"
                onClick={(e) => e.stopPropagation()}
              >
                ⌥ GitHub
              </a>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function SkeletonGrid() {
  return (
    <div className="featured-projects__grid">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="featured-project-card featured-project-card--skeleton"
        />
      ))}
    </div>
  );
}

export default function FeaturedProjects() {
  const { data: projects, isLoading, isError } = useGetFeaturedProjectsQuery();

  return (
    <section className="featured-projects">
      <div className="featured-projects__head">
        <div>
          <motion.p
            className="featured-projects__label"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            work
          </motion.p>
          <motion.h2
            className="featured-projects__title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="featured-projects__subtitle"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            Some things I&apos;ve built
          </motion.p>
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          className="featured-projects__head-link-wrap"
        >
          <Link href="/projects" className="featured-projects__head-link">
            View all →
          </Link>
        </motion.div>
      </div>

      {isLoading && <SkeletonGrid />}

      {isError && (
        <p className="featured-projects__message">
          Could not load projects. Please try again later.
        </p>
      )}

      {!isLoading && !isError && projects && projects.length > 0 && (
        <motion.div
          className="featured-projects__grid"
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </motion.div>
      )}

      {!isLoading && !isError && (!projects || projects.length === 0) && (
        <p className="featured-projects__message">No featured projects yet.</p>
      )}

      <motion.div
        className="featured-projects__footer"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        <Link href="/projects" className="featured-projects__footer-link">
          View all projects →
        </Link>
      </motion.div>
    </section>
  );
}
