'use server';

import type { LoginSchema } from '@/app/(auth)/login/schema';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function loginAction(data: LoginSchema) {
  try {
    await signIn('credentials', { ...data, redirect: false });

    return { error: null };
  } catch (error) {
    if (error instanceof AuthError && error.cause?.err) {
      return { error: error.cause.err };
    }
    return { error };
  }
}

export async function logoutAction() {
  try {
    await signOut({ redirect: false });

    return { error: null };
  } catch (error) {
    if (error instanceof AuthError && error.cause?.err) {
      return { error: error.cause.err };
    }
    return { error };
  }
}
