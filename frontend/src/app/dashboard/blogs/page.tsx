"use client";
import { useState } from "react";
import {
  useGetAllBlogsAdminQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/redux/features/blogApi";
import toast from "react-hot-toast";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  status: "draft" as const,
};

export default function DashboardBlogsPage() {
  const { data: blogs, isLoading } = useGetAllBlogsAdminQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);
    try {
      if (editId) {
        await updateBlog({ id: editId, body: fd }).unwrap();
        toast.success("Blog updated!");
      } else {
        await createBlog(fd).unwrap();
        toast.success("Blog created!");
      }
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      setImage(null);
    } catch {
      toast.error("Failed. Try again.");
    }
  };

  const handleEdit = (blog: any) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      status: blog.status,
    });
    setEditId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id).unwrap();
      toast.success("Deleted!");
    } catch {
      toast.error("Failed to delete.");
    }
  };

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
            Blogs
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            {blogs?.length || 0} posts total
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
          + New Blog
        </button>
      </div>

      {/* Form */}
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
            {editId ? "Edit Blog" : "New Blog"}
          </h3>
          <input
            style={inputStyle}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            placeholder="Excerpt (short summary)"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            placeholder="Category (e.g. Tutorial, Backend)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <textarea
            style={{ ...inputStyle, minHeight: 200, resize: "vertical" }}
            placeholder="Content (Markdown supported)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <select
              style={{ ...inputStyle, width: "auto" }}
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as any })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
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

      {/* Table */}
      <div
        style={{
          background: "var(--surface)",
          borderRadius: 14,
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr>
              {["Title", "Category", "Status", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "12px 20px",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: 40,
                    textAlign: "center",
                    color: "var(--muted)",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : (
              blogs?.map((b) => (
                <tr
                  key={b._id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td style={{ padding: "12px 20px", fontWeight: 600 }}>
                    {b.title}
                  </td>
                  <td style={{ padding: "12px 20px", color: "var(--muted)" }}>
                    {b.category}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 100,
                        fontSize: 10,
                        fontWeight: 700,
                        background:
                          b.status === "published"
                            ? "rgba(16,185,129,0.1)"
                            : "rgba(245,158,11,0.1)",
                        color: b.status === "published" ? "#10B981" : "#F59E0B",
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      color: "var(--muted)",
                      fontFamily: "DM Mono, monospace",
                      fontSize: 11,
                    }}
                  >
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => handleEdit(b)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          background: "rgba(124,58,237,0.1)",
                          color: "#A78BFA",
                          border: "1px solid rgba(124,58,237,0.2)",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          background: "rgba(239,68,68,0.1)",
                          color: "#EF4444",
                          border: "1px solid rgba(239,68,68,0.2)",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
