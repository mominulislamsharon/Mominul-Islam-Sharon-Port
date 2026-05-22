"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google", { callbackUrl: "/dashboard" });
    } else if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#020617',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader"></div>
        <p style={{ marginTop: 16, color: '#94a3b8' }}>Redirecting to secure login...</p>
      </div>
      <style jsx>{`
        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(124, 58, 237, 0.1);
          border-top-color: #7c3aed;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
