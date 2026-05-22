import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = { title: 'Contact — Mominul Islam Sharon' };

export default function ContactPage() {
  return (
    <>
    <div style={{ paddingTop: 60 }}>
      <ContactSection />
    </div>
    </>
  );
}
