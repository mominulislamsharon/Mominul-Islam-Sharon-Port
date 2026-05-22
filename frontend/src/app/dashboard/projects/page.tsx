'use client';
import { useState } from 'react';
import { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from '@/redux/features/projectApi';
import toast from 'react-hot-toast';

const emptyForm = { title: '', description: '', liveUrl: '', githubUrl: '', techStack: '', featured: false, order: '0' };

export default function DashboardProjectsPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<File | null>(null);

  const inputStyle = { padding: '10px 14px', borderRadius: 8, width: '100%', background: 'var(--elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: 13, outline: 'none' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('liveUrl', form.liveUrl);
    fd.append('githubUrl', form.githubUrl);
    fd.append('techStack', form.techStack);
    fd.append('featured', String(form.featured));
    fd.append('order', form.order);
    if (image) fd.append('image', image);
    try {
      if (editId) { await updateProject({ id: editId, body: fd }).unwrap(); toast.success('Updated!'); }
      else { await createProject(fd).unwrap(); toast.success('Created!'); }
      setShowForm(false); setEditId(null); setForm(emptyForm); setImage(null);
    } catch { toast.error('Failed.'); }
  };

  const handleEdit = (p: any) => {
    setForm({ title: p.title, description: p.description, liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '', techStack: p.techStack.join(', '), featured: p.featured, order: String(p.order) });
    setEditId(p._id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try { await deleteProject(id).unwrap(); toast.success('Deleted!'); }
    catch { toast.error('Failed.'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Projects</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>{projects?.length || 0} projects</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }} style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: 'var(--violet)', color: '#fff', border: 'none', cursor: 'pointer' }}>+ New Project</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{editId ? 'Edit' : 'New'} Project</h3>
          <input style={inputStyle} placeholder="Project title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <input style={inputStyle} placeholder="Tech stack (comma separated: React, Node.js, MongoDB)" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} />
          <input style={inputStyle} placeholder="Live URL" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} />
          <input style={inputStyle} placeholder="GitHub URL" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input style={{ ...inputStyle, width: 80 }} type="number" placeholder="Order" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              Featured on homepage
            </label>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} style={{ fontSize: 12, color: 'var(--muted)' }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" style={{ padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--violet)', color: '#fff', border: 'none', cursor: 'pointer' }}>{editId ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--elevated)', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {isLoading && <p style={{ color: 'var(--muted)', fontSize: 14 }}>Loading...</p>}
        {projects?.map(p => (
          <div key={p._id} style={{ padding: '16px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{p.title}</span>
                {p.featured && <span style={{ padding: '2px 7px', borderRadius: 100, fontSize: 9, fontWeight: 700, background: 'rgba(6,182,212,0.1)', color: '#06B6D4' }}>FEATURED</span>}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.techStack.map(t => <span key={t} style={{ padding: '2px 7px', borderRadius: 100, fontSize: 10, background: 'rgba(124,58,237,0.1)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.15)' }}>{t}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => handleEdit(p)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(124,58,237,0.1)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.2)', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(p._id)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
