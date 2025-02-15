import { login } from '@/services/auth/login';
import { isAuthenticated } from '@/utils/authentication';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { user, jwtToken, expires_date } = await login({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        return {
          id: user.user_id,
          user,
          jwt: { token: jwtToken, expiresIn: expires_date },
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.jwt = user.jwt;
        token.user = user.user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.jwt = token.jwt;
      session.user = token.user;

      return session;
    },
    authorized: ({ auth }) => isAuthenticated(auth?.jwt),
  },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
});
