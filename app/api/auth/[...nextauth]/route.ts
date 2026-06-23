import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * NextAuth configuration.
 *
 * Uses a CredentialsProvider that proxies submitted credentials to the
 * NestJS backend at POST /api/v1/auth/login. The NestJS backend issues
 * a signed JWT which we store in the NextAuth session for subsequent
 * backend API calls.
 *
 * Session strategy: JWT (no database session table in Next.js layer —
 * user state lives in NestJS + Prisma).
 */
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'ComplyPilot Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        try {
          const backendUrl =
            process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

          const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(
              error?.message ?? 'Invalid credentials. Please try again.',
            );
          }

          const data = await response.json();
          const { user, accessToken } = data as {
            user: { id: string; email: string; fullName: string; role: string };
            accessToken: string;
          };

          // Return the user object — NextAuth will pass this to the jwt callback
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role as 'CA_PARTNER' | 'CA_ARTICLE' | 'MSME_OWNER',
            accessToken,
          };
        } catch (err) {
          // Re-throw so NextAuth shows the error message on the login page
          throw new Error(
            err instanceof Error ? err.message : 'Authentication failed.',
          );
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days — matches JWT_EXPIRES_IN in NestJS
  },

  callbacks: {
    /**
     * jwt callback: called when a JWT is created or updated.
     * Inject role and accessToken from the authorize() return value.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    /**
     * session callback: called whenever a session is checked.
     * Expose role and accessToken to client components via useSession().
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    // Custom login pages — separate for CA and Owner personas
    signIn: '/auth/ca-login',
    error: '/auth/ca-login',
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
