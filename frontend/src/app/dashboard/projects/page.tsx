"use client";
import { useState } from "react";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "@/redux/features/projectApi";
import toast from "react-hot-toast";

const emptyForm = {
  title: "",
  description: "",
  liveUrl: "",
  frontendGithub: "",
  backendGithub: "",
  techStack: "",
  featured: false,
  order: "0",
};

export default function DashboardProjectsPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState<File[]>([]);

  const inputStyle = {
    padding: "10px 14px",
    borderRadius: 8,
    width: "100%",
    background: "var(--elevated)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 13,
    outline: "none",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("liveUrl", form.liveUrl);
    fd.append("frontendGithub", form.frontendGithub);
    fd.append("backendGithub", form.backendGithub);
    fd.append("techStack", form.techStack);
    fd.append("featured", String(form.featured));
    fd.append("order", form.order);
    
    // Append multiple images
    images.forEach((img) => {
      fd.append("images", img);
    });

    try {
      if (editId) {
        await updateProject({ id: editId, body: fd }).unwrap();
        toast.success("Updated!");
      } else {
        await createProject(fd).unwrap();
        toast.success("Created!");
      }
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      setImages([]);
    } catch {
      toast.error("Failed.");
    }
  };

  const handleEdit = (p: any) => {
    setForm({
      title: p.title,
      description: p.description,
      liveUrl: p.liveUrl || "",
      frontendGithub: p.frontendGithub || "",
      backendGithub: p.backendGithub || "",
      techStack: p.techStack.join(", "),
      featured: p.featured,
      order: String(p.order),
    });
    setEditId(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try {
      await deleteProject(id).unwrap();
      toast.success("Deleted!");
    } catch {
      toast.error("Failed.");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -1,
              marginBottom: 4,
            }}
          >
            Projects
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            {projects?.length || 0} projects
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm(emptyForm);
          }}
          style={{
            padding: "9px 20px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            background: "var(--violet)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: 24,
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
            {editId ? "Edit" : "New"} Project
          </h3>
          <input
            style={inputStyle}
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            placeholder="Tech stack (comma separated: React, Node.js, MongoDB)"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Live URL"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Frontend GitHub URL"
            value={form.frontendGithub}
            onChange={(e) => setForm({ ...form, frontendGithub: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Backend GitHub URL"
            value={form.backendGithub}
            onChange={(e) => setForm({ ...form, backendGithub: e.target.value })}
          />
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              style={{ ...inputStyle, width: 80 }}
              type="number"
              placeholder="Order"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
            />
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--muted)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured on homepage
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setImages(files);
              }}
              style={{ fontSize: 12, color: "var(--muted)" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              style={{
                padding: "9px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                background: "var(--violet)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              {editId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              style={{
                padding: "9px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                background: "var(--elevated)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
          gap: "24px",
          maxWidth: "100%",
        }}
      >
        {isLoading && (
          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              gridColumn: "1 / -1",
            }}
          >
            Loading...
          </p>
        )}
        {projects?.map((p, idx) => (
          <div
            key={p._id}
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
            {/* Image Header */}
            <div
              style={{
                height: "clamp(140px, 20vw, 200px)",
                background:
                  "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {p.images && p.images.length > 0 ? (
                <img
                  src={p.images[0].url}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "🚀"
              )}
              {p.images && p.images.length > 1 && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        background: "rgba(0,0,0,0.5)",
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: 10,
                        color: "#fff"
                    }}
                >
                    +{p.images.length - 1} more
                </div>
              )}
              {p.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    background: "rgba(6,182,212,0.9)",
                    color: "#fff",
                  }}
                >
                  ⭐ FEATURED
                </div>
              )}
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
              <div
                style={{
                  fontSize: "clamp(15px, 2vw, 16px)",
                  fontWeight: 700,
                  marginBottom: 6,
                  color: "#06B6D4",
                }}
              >
                {p.title}
              </div>
              <p
                style={{
                  fontSize: "clamp(12px, 1.8vw, 13px)",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  marginBottom: 10,
                  flex: 1,
                }}
              >
                {p.description}
              </p>

              {/* Tech Stack */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                {p.techStack.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "4px 9px",
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

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleEdit(p)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "var(--violet)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
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
                  ✎ Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "rgba(239,68,68,0.1)",
                    color: "#EF4444",
                    border: "1px solid rgba(239,68,68,0.3)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(239,68,68,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(239,68,68,0.1)";
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
