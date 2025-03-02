import { RegisterCompanyForm } from '@/app/(protected)/gerenciamento-de-usuarios/cadastrar-empresa/form';
import { Box } from '@/components/Box';

export default function RegisterCompanyPage() {
  return (
    <Box title="Cadastrar Empresa">
      <h2 className="mb-1 flex items-center gap-2 text-sm text-primary text-opacity-60">
        Preencha os campos abaixo para cadastrar uma empresa
      </h2>

      <RegisterCompanyForm />
    </Box>
  );
}
