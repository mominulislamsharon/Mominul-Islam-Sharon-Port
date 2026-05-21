'use client';
import { useState } from 'react';
import { useGetProjectsQuery } from '@/redux/features/projectApi';
import Image from 'next/image';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [filter, setFilter] = useState('All');

  const allTechs = ['All', ...Array.from(new Set(projects?.flatMap(p => p.techStack) || []))];
  const filtered = filter === 'All' ? projects : projects?.filter(p => p.techStack.includes(filter));

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px', position: 'relative', zIndex: 1 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'var(--violet)', textTransform: 'uppercase', marginBottom: 8 }}>portfolio</p>
      <h1 style={{
        fontSize: 36, fontWeight: 800, letterSpacing: -1.5, marginBottom: 8,
        background: 'linear-gradient(135deg,#F1F5F9,#C4B5FD)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>All Projects</h1>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 36 }}>Things I've built and shipped</p>

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {allTechs.map(tech => (
          <button key={tech} onClick={() => setFilter(tech)} style={{
            padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500,
            background: filter === tech ? 'var(--violet)' : 'var(--surface)',
            color: filter === tech ? '#fff' : 'var(--muted)',
            border: `1px solid ${filter === tech ? 'var(--violet)' : 'var(--border)'}`,
            cursor: 'pointer', transition: 'all 0.2s',
          }}>{tech}</button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60 }}>Loading projects...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
          {filtered?.map(p => (
            <div key={p._id} style={{
              borderRadius: 14, overflow: 'hidden',
              background: 'var(--surface)', border: '1px solid var(--border)',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(124,58,237,0.4)';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = '';
                el.style.boxShadow = '';
              }}
            >
              <div style={{
                height: 160,
                background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.1))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, position: 'relative',
              }}>
                {p.image ? <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} /> : '🚀'}
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>{p.description}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {p.techStack.map(t => (
                    <span key={t} style={{
                      padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 500,
                      background: 'rgba(124,58,237,0.1)', color: '#A78BFA',
                      border: '1px solid rgba(124,58,237,0.2)',
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, background: 'var(--violet)', color: '#fff', textDecoration: 'none' }}>↗ Live</a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.06)', color: 'var(--muted)', border: '1px solid var(--border)', textDecoration: 'none' }}>⌥ GitHub</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
