import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    user: { name?: string | null; email?: string | null; image?: string | null; isAdmin?: boolean };
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      token.isAdmin = token.email === process.env.ADMIN_EMAIL;
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin as boolean;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: { signIn: '/' },
};
