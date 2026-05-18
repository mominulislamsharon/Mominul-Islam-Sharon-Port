export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center', padding: '40px 24px',
      fontSize: 12, color: 'var(--muted)',
      borderTop: '1px solid var(--border)',
      position: 'relative', zIndex: 1,
    }}>
      Built with{' '}
      <span style={{ color: 'var(--violet)', fontWeight: 600 }}>Next.js + TypeScript</span>
      {' '}· Deployed on{' '}
      <span style={{ color: 'var(--violet)', fontWeight: 600 }}>Vercel</span>
      {' '}· Backend on{' '}
      <span style={{ color: 'var(--violet)', fontWeight: 600 }}>Railway</span>
      <br />
      <span style={{ marginTop: 8, display: 'inline-block' }}>
        © {new Date().getFullYear()} Mominul Islam Sharon
      </span>
    </footer>
  );
}
