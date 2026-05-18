import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import CustomCursor from '@/components/shared/CustomCursor';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Mominul Islam Sharon — Full Stack Developer',
  description: 'Full Stack MERN Developer building modern, scalable, high-performance web applications.',
  keywords: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Full Stack Developer', 'MERN'],
  authors: [{ name: 'Mominul Islam Sharon' }],
  openGraph: {
    title: 'Mominul Islam Sharon — Full Stack Developer',
    description: 'Building modern, scalable web applications with Next.js and Node.js.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="bg-grid" />
          <CustomCursor />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111827',
                color: '#F1F5F9',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
