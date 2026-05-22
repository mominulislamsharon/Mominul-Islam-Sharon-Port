'use client';
import { useGetMessagesQuery, useMarkAsReadMutation, useDeleteMessageMutation } from '@/redux/features/messageApi';
import toast from 'react-hot-toast';

export default function DashboardMessagesPage() {
  const { data: messages, isLoading } = useGetMessagesQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Messages</h1>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 32 }}>
        {messages?.filter(m => !m.read).length || 0} unread messages
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {isLoading && <p style={{ color: 'var(--muted)', fontSize: 14 }}>Loading...</p>}
        {messages?.map(msg => (
          <div key={msg._id} style={{
            padding: 20, borderRadius: 14,
            background: 'var(--surface)',
            border: `1px solid ${msg.read ? 'var(--border)' : 'rgba(124,58,237,0.3)'}`,
            opacity: msg.read ? 0.7 : 1, transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{msg.name}</span>
                <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 10, fontFamily: 'DM Mono, monospace' }}>{msg.email}</span>
                {!msg.read && <span style={{ marginLeft: 10, padding: '2px 7px', borderRadius: 100, fontSize: 9, fontWeight: 700, background: 'rgba(124,58,237,0.15)', color: '#A78BFA' }}>NEW</span>}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Mono, monospace' }}>
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 12 }}>{msg.message}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {!msg.read && (
                <button onClick={async () => { await markAsRead(msg._id).unwrap(); toast.success('Marked as read'); }} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)', cursor: 'pointer' }}>
                  ✓ Mark read
                </button>
              )}
              <button onClick={async () => { if (!confirm('Delete?')) return; await deleteMessage(msg._id).unwrap(); toast.success('Deleted'); }} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {!isLoading && messages?.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>No messages yet.</p>
        )}
      </div>
    </div>
  );
}
