import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

async function getBlog(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blog = await getBlog(params.id);
  return {
    title: blog ? `${blog.title} — Mominul Islam Sharon` : "Blog Post",
    description: blog?.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlog(params.id);
  if (!blog)
    return (
      <div style={{ textAlign: "center", padding: 80, color: "var(--muted)" }}>
        Blog post not found.
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "60px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <a
        href="/blog"
        style={{
          fontSize: 13,
          color: "var(--muted)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 32,
        }}
      >
        ← Back to Blog
      </a>

      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--cyan)",
          marginBottom: 12,
        }}
      >
        {blog.category}
      </p>
      <h1
        style={{
          fontSize: "clamp(26px,4vw,40px)",
          fontWeight: 800,
          letterSpacing: -1.5,
          lineHeight: 1.15,
          marginBottom: 16,
          background: "linear-gradient(135deg,#F1F5F9,#C4B5FD)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {blog.title}
      </h1>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 48,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "var(--muted)",
            fontFamily: "DM Mono, monospace",
          }}
        >
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 100,
            fontSize: 10,
            fontWeight: 700,
            background: "rgba(16,185,129,0.1)",
            color: "#10B981",
          }}
        >
          Published
        </span>
      </div>

      {/* Markdown content */}
      <div style={{ lineHeight: 1.8, fontSize: 15, color: "#CBD5E1" }}>
        <style>{`
          .prose h1,h2,h3 { color: #F1F5F9; font-weight: 800; margin: 2rem 0 1rem; }
          .prose h2 { font-size: 1.5rem; }
          .prose h3 { font-size: 1.2rem; }
          .prose p { margin-bottom: 1.2rem; color: #94A3B8; }
          .prose code { background: #111827; padding: 2px 8px; border-radius: 6px; font-family: 'DM Mono', monospace; font-size: 13px; color: #A78BFA; }
          .prose pre { background: #111827; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 20px; overflow-x: auto; margin: 1.5rem 0; }
          .prose pre code { background: none; padding: 0; color: #E2E8F0; }
          .prose a { color: #7C3AED; text-decoration: underline; }
          .prose ul,ol { padding-left: 1.5rem; margin-bottom: 1.2rem; color: #94A3B8; }
          .prose li { margin-bottom: 0.5rem; }
          .prose blockquote { border-left: 3px solid #7C3AED; padding-left: 1rem; margin: 1.5rem 0; color: #64748B; font-style: italic; }
          .prose img { border-radius: 12px; max-width: 100%; }
          .prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 2rem 0; }
        `}</style>
        <div className="prose">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
