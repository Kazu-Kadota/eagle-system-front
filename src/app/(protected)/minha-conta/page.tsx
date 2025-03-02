import { AccountHomeForm } from '@/app/(protected)/minha-conta/form';
import { Box } from '@/components/Box';

export default function AccountHomePage() {
  return (
    <Box title="Minha conta" className="flex flex-col gap-3 sm:gap-4">
      <AccountHomeForm />
    </Box>
  );
}
