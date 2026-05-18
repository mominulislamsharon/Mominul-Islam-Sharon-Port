import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/shared/DashboardSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) redirect('/');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <DashboardSidebar />
      <main style={{ flex: 1, padding: '32px 32px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
