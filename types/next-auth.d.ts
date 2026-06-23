import 'next-auth';
import 'next-auth/jwt';

/**
 * Extend NextAuth's default Session and JWT interfaces to include:
 * - role: The user's ComplyPilot role (CA_PARTNER | CA_ARTICLE | MSME_OWNER)
 * - accessToken: The NestJS-issued JWT for backend API calls
 * - userId: The Prisma User.id (UUID)
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'CA_PARTNER' | 'CA_ARTICLE' | 'MSME_OWNER';
    };
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'CA_PARTNER' | 'CA_ARTICLE' | 'MSME_OWNER';
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'CA_PARTNER' | 'CA_ARTICLE' | 'MSME_OWNER';
    accessToken: string;
  }
}
