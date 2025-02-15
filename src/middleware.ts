export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/',
    '/analises',
    '/analises/pessoas/consultar',
    '/analises/veiculos/consultar',
    '/minha-conta',
  ],
};
