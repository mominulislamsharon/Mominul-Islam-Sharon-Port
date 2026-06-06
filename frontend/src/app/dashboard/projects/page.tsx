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
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string }[]>([]);

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
    
    if (editId) {
      fd.append("keepImages", JSON.stringify(existingImages));
    }

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
      setExistingImages([]);
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
    setExistingImages(p.images || []);
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Projects</h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>{projects?.length || 0} projects</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); setExistingImages([]); setImages([]); }}
          style={{ padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: "var(--violet)", color: "#fff", border: "none", cursor: "pointer" }}
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{editId ? "Edit" : "New"} Project</h3>
          <input style={inputStyle} placeholder="Project title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <input style={inputStyle} placeholder="Tech stack (comma separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
          <input style={inputStyle} placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
          <input style={inputStyle} placeholder="Frontend GitHub" value={form.frontendGithub} onChange={(e) => setForm({ ...form, frontendGithub: e.target.value })} />
          <input style={inputStyle} placeholder="Backend GitHub" value={form.backendGithub} onChange={(e) => setForm({ ...form, backendGithub: e.target.value })} />
          
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input style={{ ...inputStyle, width: 80 }} type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
            <div style={{ flex: 1 }}>
              <input type="file" id="file-input" accept="image/*" multiple onChange={(e) => setImages(e.target.files ? Array.from(e.target.files) : [])} style={{ display: "none" }} />
              <label htmlFor="file-input" style={{ padding: "8px 16px", borderRadius: 8, fontSize: 12, background: "rgba(255,255,255,0.05)", border: "1px dashed var(--border)", color: "var(--muted)", cursor: "pointer" }}>
                + Upload Images
              </label>
            </div>
          </div>

          {(existingImages.length > 0 || images.length > 0) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: 12, background: "rgba(0,0,0,0.2)", borderRadius: 10 }}>
              {existingImages.map((img, idx) => (
                <div key={idx} style={{ position: "relative", width: 60, height: 60, borderRadius: 6, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img src={img.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  <button type="button" onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))} style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: "#EF4444", color: "#fff", border: "none", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                </div>
              ))}
              {images.map((_, idx) => (
                <div key={idx} style={{ width: 60, height: 60, borderRadius: 6, border: "1px solid #06B6D4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#06B6D4", background: "rgba(6,182,212,0.1)" }}>New File</div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" style={{ padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "var(--violet)", color: "#fff", border: "none", cursor: "pointer" }}>{editId ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "var(--elevated)", color: "var(--muted)", border: "1px solid var(--border)", cursor: "pointer" }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))", gap: "24px" }}>
        {isLoading && <p style={{ color: "var(--muted)", fontSize: 14 }}>Loading...</p>}
        {projects?.map((p) => (
          <div key={p._id} style={{ borderRadius: 16, overflow: "hidden", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ height: 180, background: "rgba(255,255,255,0.03)", position: "relative" }}>
              {p.images?.[0] ? <img src={p.images[0].url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /> : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 32 }}>🚀</div>}
              {p.featured && <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: "rgba(6,182,212,0.9)", color: "#fff" }}>⭐ FEATURED</div>}
            </div>
            <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#06B6D4" }}>{p.title}</div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, marginBottom: 12, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => handleEdit(p)} style={{ flex: 1, padding: "8px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: "var(--violet)", color: "#fff", border: "none", cursor: "pointer" }}>✎ Edit</button>
                <button onClick={() => handleDelete(p._id)} style={{ flex: 1, padding: "8px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer" }}>🗑 Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
