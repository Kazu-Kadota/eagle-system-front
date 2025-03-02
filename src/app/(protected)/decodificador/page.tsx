import { Base64DecordForm } from '@/app/(protected)/decodificador/form';
import { Box } from '@/components/Box';

export default function Base64DecoderPage() {
  return (
    <Box title="Decodificador" className="">
      <h2 className="mb-5 flex items-center gap-2 text-sm text-primary text-opacity-60">
        Preencha o campo abaixo para decodificar o texto.
      </h2>

      <Base64DecordForm />
    </Box>
  );
}
