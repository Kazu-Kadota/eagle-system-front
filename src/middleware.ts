export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/',
    '/minha-conta',
    '/gerenciamento-de-usuarios',
    '/gerenciamento-de-usuarios/:path',
    '/relatorios',
  ],
};
