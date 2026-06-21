"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetFeaturedProjectsQuery } from "@/redux/features/projectApi";
import type { Project } from "@/redux/features/projectApi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as any },
  },
};

const gridStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as any },
  },
};

const inViewOnce = { once: true, amount: 0.1 as const };

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <motion.article
      variants={cardMotion}
      whileHover={{
        y: -6,
        borderColor: "rgba(124,58,237,0.5)",
        boxShadow: "0 20px 50px rgba(124,58,237,0.2)",
      }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s ease",
      }}
    >
      {/* Image Header with Counter */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            height: "clamp(180px, 25vw, 240px)",
            background:
              "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.1))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(32px, 8vw, 48px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Link
            href={`/projects/${project._id}`}
            style={{
              display: "block",
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            {project.images && project.images.length > 0 ? (
              <Image
                src={project.images[0].url}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
                aria-hidden
              >
                🚀
              </span>
            )}
          </Link>
          {/* Counter Badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              color: "#A78BFA",
              padding: "4px 10px",
              borderRadius: 20,
            }}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "clamp(20px, 4vw, 32px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link
          href={`/projects/${project._id}`}
          style={{ textDecoration: "none" }}
        >
          <h3
            style={{
              fontSize: "clamp(15px, 2.5vw, 18px)",
              fontWeight: 700,
              marginBottom: 8,
              color: "#06B6D4",
            }}
          >
            {project.title}
          </h3>
        </Link>
        <Link
          href={`/projects/${project._id}`}
          style={{ textDecoration: "none" }}
        >
          <p
            style={{
              fontSize: "clamp(12px, 1.8vw, 13px)",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: 14,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.description}
          </p>
        </Link>

        {/* Tech Stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 14,
          }}
        >
          {project.techStack.map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 10px",
                borderRadius: 100,
                fontSize: "10px",
                fontWeight: 600,
                background: "rgba(124,58,237,0.12)",
                color: "#C4B5FD",
                border: "1px solid rgba(167,139,250,0.3)",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: "11px",
                fontWeight: 600,
                background: "var(--violet)",
                color: "#fff",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
                flex: 1,
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#9C7ED6";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--violet)";
              }}
            >
              ↗ Live
            </a>
          )}
          {project.frontendGithub && (
            <a
              href={project.frontendGithub}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: "11px",
                fontWeight: 600,
                background: "rgba(255,255,255,0.06)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
                flex: 1,
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(124,58,237,0.5)";
                el.style.color = "#A78BFA";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted)";
              }}
            >
              ⌥ Client 
            </a>
          )}
          {project.backendGithub && (
            <a
              href={project.backendGithub}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: "11px",
                fontWeight: 600,
                background: "rgba(255,255,255,0.06)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
                flex: 1,
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(124,58,237,0.5)";
                el.style.color = "#A78BFA";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted)";
              }}
            >
              ⌥ Server
            </a>
          )}
        </div>
      </div>
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
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          {projects.slice(0, 3).map((p, idx) => (
            <ProjectCard
              key={p._id}
              project={p}
              index={idx}
              total={projects.length}
            />
          ))}
          {/* Empty slots for remaining cards - no visible border */}
          {[...Array(Math.max(0, 3 - projects.length))].map((_, i) => (
            <div key={`empty-${i}`} />
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
