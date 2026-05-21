import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = { title: 'Contact — Mominul Islam Sharon' };

export default function ContactPage() {
  return (
    <>
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 0', position: 'relative', zIndex: 1 }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'var(--violet)', textTransform: 'uppercase', marginBottom: 8 }}>contact</p>
      <h1 style={{
        fontSize: 36, fontWeight: 800, letterSpacing: -1.5, marginBottom: 8,
        background: 'linear-gradient(135deg,#F1F5F9,#C4B5FD)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Get In Touch</h1>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 48 }}>
        Open to freelance projects, full-time roles, and collaborations.
      </p>
    </div>
    <ContactSection />
    </>
  );
}
