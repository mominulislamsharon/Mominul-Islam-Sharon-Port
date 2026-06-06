"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/mominulislamsharon" },
    {
      icon: <FaLinkedinIn />,
      url: "https://linkedin.com/in/mominulislamsharon",
    },
    { icon: <RiTwitterXFill />, url: "https://twitter.com/mominulsharon" },
    { icon: <FaFacebookF />, url: "https://www.facebook.com/mominulislamsharon1" },
  ];

  const techStack = ["Next.js", "TypeScript", "MongoDB", "Vercel"];

  return (
    <footer
      className="w-full bg-[#080C14] border-t border-[rgba(255,255,255,0.05)] mt-32"
      style={{ paddingTop: "60px", paddingBottom: "40px" }}
    >
      {/* Centered Content Container */}
      <div className="mx-auto px-6 lg:px-8" style={{ maxWidth: "1100px" }}>
        {/* Main Content Layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "60px",
            flexWrap: "wrap",
            marginBottom: "60px",
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div
            style={{
              flex: "1.5 1 320px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "white",
                margin: 0,
                letterSpacing: "-0.03em",
              }}
            >
              MS<span style={{ color: "#7C3AED" }}>.</span>
            </h2>
            <p
              style={{
                fontSize: "15.5px",
                lineHeight: "1.7",
                color: "#94A3B8",
                maxWidth: "340px",
                margin: 0,
              }}
            >
              Full Stack MERN Developer building modern, scalable web
              applications with clean code and great UX.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    y: -4,
                    backgroundColor: "#111827",
                    borderColor: "#7C3AED40",
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "42px",
                    height: "42px",
                    borderRadius: "11px",
                    backgroundColor: "rgba(17, 24, 39, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                    color: "#94A3B8",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                >
                  <span style={{ fontSize: "17px" }}>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Nav Links */}
          <div
            style={{
              flex: "0.8 1 140px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "11px",
                fontWeight: "800",
                color: "#4B5E7E",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                margin: 0,
              }}
            >
              Navigation
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {["Home", "Projects", "Blog", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  style={{
                    color: "#94A3B8",
                    fontSize: "15px",
                    textDecoration: "none",
                    width: "fit-content",
                    transition: "color 0.2s",
                  }}
                  className="hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Status & Email */}
          <div
            style={{
              flex: "1.2 1 280px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "11px",
                fontWeight: "800",
                color: "#4B5E7E",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                margin: 0,
              }}
            >
              Availability
            </h3>

            <div
              style={{
                backgroundColor: "rgba(13, 17, 23, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "18px",
                padding: "24px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                    flexShrink: 0,
                  }}
                />
                <h4
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "17px",
                    margin: 0,
                  }}
                >
                  Open to work
                </h4>
              </div>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#64748B",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Available for freelance &<br />
                full-time positions
              </p>
            </div>

            <a
              href="mailto:mominulislamsharon@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#94A3B8",
                fontSize: "13.5px",
                textDecoration: "none",
              }}
              className="hover:text-white transition-colors"
            >
              <FaEnvelope style={{ color: "#4B5E7E" }} />
              <span>mominulislamsharon@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.035)",
            marginBottom: "40px",
          }}
        />

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13.5px",
              color: "#64748B",
              fontWeight: "500",
            }}
          >
            <span>© {currentYear}</span>
            <span style={{ color: "#7C3AED", fontWeight: "700" }}>
              Sharon Portfolio
            </span>
            <span style={{ color: "#334155" }}>· All rights reserved</span>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "5px 14px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(17, 24, 39, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                  color: "#7C3AED",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.02em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
