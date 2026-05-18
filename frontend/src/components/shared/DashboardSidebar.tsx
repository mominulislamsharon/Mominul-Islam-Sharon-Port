'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  { href: '/dashboard', label: '📊 Overview', exact: true },
  { href: '/dashboard/blogs', label: '📝 Blogs' },
  { href: '/dashboard/projects', label: '🚀 Projects' },
  { href: '/dashboard/messages', label: '💬 Messages' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 200, flexShrink: 0, padding: '24px 12px',
      borderRight: '1px solid var(--border)',
      background: 'var(--surface)',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh',
    }}>
      <Link href="/" style={{
        fontWeight: 800, fontSize: 16, letterSpacing: -0.5, marginBottom: 32,
        background: 'linear-gradient(135deg,#F1F5F9,#A78BFA)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        textDecoration: 'none', display: 'block', paddingLeft: 10,
      }}>MS. Dashboard</Link>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} style={{
              padding: '9px 12px', borderRadius: 10, fontSize: 13, fontWeight: 500,
              color: isActive ? 'var(--text)' : 'var(--muted)',
              background: isActive ? 'rgba(124,58,237,0.12)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(124,58,237,0.2)' : 'transparent'}`,
              textDecoration: 'none', transition: 'all 0.2s',
            }}>{item.label}</Link>
          );
        })}
      </nav>

      <button onClick={() => signOut({ callbackUrl: '/' })} style={{
        padding: '9px 12px', borderRadius: 10, fontSize: 13, fontWeight: 500,
        color: '#EF4444', background: 'transparent',
        border: '1px solid transparent', cursor: 'pointer',
        transition: 'all 0.2s', textAlign: 'left',
        fontFamily: 'DM Sans, sans-serif',
      }}>⎋ Logout</button>
    </aside>
  );
}
