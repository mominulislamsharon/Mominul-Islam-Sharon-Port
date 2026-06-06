"use client";

import { useGetProjectByIdQuery } from "@/redux/features/projectApi";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const stagger = {
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function ProjectDetailsPage() {
  const params = useParams() as { id: string };
  const id = params.id;
  const { data: project, isLoading, isError } = useGetProjectByIdQuery(id);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "120px 20px 80px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={stagger}>
        <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16, background: "linear-gradient(to right, #A78BFA, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {project.title}
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {project.techStack.map((tech) => (
              <span key={tech} style={{ padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, background: "rgba(124,58,237,0.1)", color: "#C4B5FD", border: "1px solid rgba(167,139,250,0.2)" }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Media Section */}
        <motion.div variants={fadeUp} style={{ marginBottom: 64 }}>
          <div style={{ borderRadius: 24, overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", position: "relative", aspectRatio: "16/9", marginBottom: 20 }}>
            {project.images && project.images.length > 0 ? (
              <Image
                src={project.images[activeImage].url}
                alt={project.title}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 64 }}>🚀</div>
            )}
          </div>

          {/* Thumbnails */}
          {project.images && project.images.length > 1 && (
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 10 }}>
              {project.images.map((img, idx) => (
                <button
                  key={img.publicId}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    position: "relative",
                    width: 100,
                    height: 60,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: activeImage === idx ? "2px solid #06B6D4" : "1px solid var(--border)",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s"
                  }}
                >
                  <Image src={img.url} alt="thumbnail" fill style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Content Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 64 }}>
          <motion.div variants={fadeUp}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "var(--text)" }}>About Project</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {project.description}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "var(--text)" }}>Links</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 12, background: "var(--violet)", color: "#fff", textDecoration: "none", fontWeight: 700, transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  ↗ Live Preview
                </a>
              )}
              {project.frontendGithub && (
                <a href={project.frontendGithub} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", color: "var(--text)", border: "1px solid var(--border)", textDecoration: "none", fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                  ⌥ Frontend Repository
                </a>
              )}
              {project.backendGithub && (
                <a href={project.backendGithub} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", color: "var(--text)", border: "1px solid var(--border)", textDecoration: "none", fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                  ⌥ Backend Repository
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
