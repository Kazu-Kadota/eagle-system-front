import { type DefaultSession } from 'next-auth';
import { type JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    user: ApiUser;
    jwt: {
      token: string;
      expiresIn: string;
    };
  }

  interface Session {
    user: {
      user: ApiUser;
      jwt: {
        token: string;
        expiresIn: string;
      };
    } & DefaultSession['user'];
    jwt: {
      token: string;
      expiresIn: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: ApiUser;
    jwt: {
      token: string;
      expiresIn: string;
    };
  }
}
