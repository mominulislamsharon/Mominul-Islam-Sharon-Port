"use client";
import { useState } from "react";
import { useGetProjectsQuery } from "@/redux/features/projectApi";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [filter, setFilter] = useState("All");

  const allTechs = [
    "All",
    ...Array.from(new Set(projects?.flatMap((p) => p.techStack) || [])),
  ];
  const filtered =
    filter === "All"
      ? projects
      : projects?.filter((p) => p.techStack.includes(filter));

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 20px 60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 3,
          color: "var(--violet)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        portfolio
      </p>
      <h1
        style={{
          fontSize: "clamp(28px, 6vw, 42px)",
          fontWeight: 800,
          letterSpacing: -1.5,
          marginBottom: 12,
          background: "linear-gradient(135deg,#F1F5F9,#C4B5FD)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        All Projects
      </h1>
      <p
        style={{
          fontSize: "clamp(13px, 2vw, 15px)",
          color: "var(--muted)",
          marginBottom: 32,
        }}
      >
        Things I've built and shipped
      </p>

      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 32,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            style={{
              padding: "6px 14px",
              borderRadius: 100,
              fontSize: "clamp(11px, 1.5vw, 12px)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              background: filter === tech ? "var(--violet)" : "var(--surface)",
              color: filter === tech ? "#fff" : "var(--muted)",
              border: `1px solid ${filter === tech ? "var(--violet)" : "var(--border)"}`,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tech}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div
          style={{
            textAlign: "center",
            color: "var(--muted)",
            padding: "60px 20px",
          }}
        >
          Loading projects...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
            gap: "24px",
          }}
        >
          {filtered?.map((p, idx) => (
            <div
              key={p._id}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(124,58,237,0.5)";
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 20px 50px rgba(124,58,237,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "";
                el.style.boxShadow = "";
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
                    href={`/projects/${p._id}`}
                    style={{
                      display: "block",
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {p.images && p.images.length > 0 ? (
                      <Image
                        src={p.images[0].url}
                        alt={p.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        🚀
                      </div>
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
                    {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(filtered?.length || 0).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "clamp(16px, 3vw, 20px)",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  href={`/projects/${p._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      fontSize: "clamp(15px, 2.5vw, 18px)",
                      fontWeight: 700,
                      marginBottom: 8,
                      color: "#06B6D4",
                    }}
                  >
                    {p.title}
                  </div>
                </Link>
                <Link
                  href={`/projects/${p._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
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
                    {p.description}
                  </div>
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
                  {p.techStack.map((t) => (
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
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
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
                  {p.frontendGithub && (
                    <a
                      href={p.frontendGithub}
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
                  {p.backendGithub && (
                    <a
                      href={p.backendGithub}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
