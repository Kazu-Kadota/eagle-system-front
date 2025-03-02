import type { User as ApiUser } from '@/models';

declare module 'next-auth' {
  interface User {
    user: ApiUser;
    jwt: {
      token: string;
      expiresIn: string;
    };
  }

  interface Session {
    user: ApiUser;
    jwt: {
      token: string;
      expiresIn: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    jwt: {
      token: string;
      expiresIn: string;
    };
  }
}
