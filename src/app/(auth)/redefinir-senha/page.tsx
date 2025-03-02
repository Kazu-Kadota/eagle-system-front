import { Box } from '@/components/Box';
import { ResetPasswordForm } from './form';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <Box>
      <p className="mb-7 text-center text-base font-semibold text-primary">
        Preencha os campos abaixo para redefinir sua senha
      </p>

      <ResetPasswordForm />
    </Box>
  );
}
