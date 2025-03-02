import { LoginForm } from '@/app/(auth)/login/form';
import { Box } from '@/components/Box';
import { Link } from '@/components/Link';
import { RoutePaths } from '@/constants/paths';
import { verifyIsLoggedIn } from '@/utils/authentication';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const isLoggedIn = await verifyIsLoggedIn();

  if (isLoggedIn) {
    redirect(RoutePaths.HOME);
  }

  return (
    <Box className="pb-10">
      <p className="text-center text-base font-semibold text-primary">
        Bem vindo(a) de volta!
      </p>

      <LoginForm />

      <Link
        href={RoutePaths.FORGOT_PASSWORD}
        className="mt-4 self-center text-center text-sm text-dark underline"
      >
        Esqueci minha senha
      </Link>
    </Box>
  );
}
