'use client';
import { useGetAllBlogsAdminQuery } from '@/redux/features/blogApi';
import { useGetProjectsQuery } from '@/redux/features/projectApi';
import { useGetMessagesQuery } from '@/redux/features/messageApi';

export default function DashboardPage() {
  const { data: blogs } = useGetAllBlogsAdminQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: messages } = useGetMessagesQuery();
  const unread = messages?.filter(m => !m.read).length || 0;

  const stats = [
    { label: 'Total Blogs', value: blogs?.length || 0, badge: `${blogs?.filter(b => b.status === 'published').length || 0} published`, color: '#7C3AED' },
    { label: 'Projects', value: projects?.length || 0, badge: `${projects?.filter(p => p.featured).length || 0} featured`, color: '#06B6D4' },
    { label: 'Messages', value: messages?.length || 0, badge: `${unread} unread`, color: unread > 0 ? '#EF4444' : '#10B981' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Overview</h1>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 32 }}>Welcome back, Admin 👋</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 16, marginBottom: 40 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            padding: '20px', borderRadius: 14,
            background: 'var(--surface)', border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
            <div style={{
              display: 'inline-block', marginTop: 8, padding: '2px 8px', borderRadius: 100,
              fontSize: 10, fontWeight: 700,
              background: `${s.color}18`, color: s.color,
            }}>{s.badge}</div>
          </div>
        ))}
      </div>

      {/* Recent blogs table */}
      <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 700 }}>Recent Blogs</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Title', 'Category', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 20px', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blogs?.slice(0, 5).map(b => (
              <tr key={b._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 20px', color: 'var(--text)' }}>{b.title}</td>
                <td style={{ padding: '10px 20px', color: 'var(--muted)' }}>{b.category}</td>
                <td style={{ padding: '10px 20px' }}>
                  <span style={{
                    padding: '3px 9px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                    background: b.status === 'published' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: b.status === 'published' ? '#10B981' : '#F59E0B',
                  }}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
