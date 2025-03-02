import { RegisterUserForm } from '@/app/(protected)/gerenciamento-de-usuarios/cadastrar-usuario/form';
import { Box } from '@/components/Box';

export default function RegisterUserPage() {
  return (
    <Box title="Cadastrar Usuário">
      <h2 className="mb-1 flex items-center gap-2 text-sm text-primary text-opacity-60">
        Preencha os campos abaixo para cadastrar um usuário
      </h2>

      <RegisterUserForm />
    </Box>
  );
}
