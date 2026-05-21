import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Blog — Mominul Islam Sharon' };

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px', position: 'relative', zIndex: 1 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'var(--violet)', textTransform: 'uppercase', marginBottom: 8 }}>writing</p>
      <h1 style={{
        fontSize: 36, fontWeight: 800, letterSpacing: -1.5, marginBottom: 8,
        background: 'linear-gradient(135deg,#F1F5F9,#C4B5FD)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Blog</h1>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 48 }}>Thoughts on code, tools, and craft</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {blogs.map((blog: any) => (
          <a key={blog._id} href={`/blog/${blog._id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: 24, borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--border)',
              transition: 'all 0.25s', cursor: 'pointer', height: '100%',
            }}
            >
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 10 }}>{blog.category}</p>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.4, color: 'var(--text)' }}>{blog.title}</h3>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>{blog.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Mono, monospace' }}>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ fontSize: 11, color: 'var(--violet)', fontWeight: 600 }}>Read →</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {blogs.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>
          No blog posts yet. Check back soon!
        </div>
      )}
    </div>
  );
}
