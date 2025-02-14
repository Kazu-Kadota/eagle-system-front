import {
  maskCnpj,
  maskCpf,
  maskCpfOrCnpj,
  maskDate,
  maskPlate,
} from '@/utils/masks';
import { identity } from '@/utils/utils';
import { type InputType } from '@/components/Input';

interface MaskInputProps extends React.ComponentProps<'input'> {
  type: InputType;
}

const maskFnByType: { [key in InputType]: (value: string) => string } = {
  cpf: maskCpf,
  cnpj: maskCnpj,
  cpfOrCnpj: maskCpfOrCnpj,
  date: maskDate,
  plate: maskPlate,
  password: identity,
  text: identity,
  email: identity,
};

export function MaskInput({ onChange, type, ...rest }: MaskInputProps) {
  const maskFn = maskFnByType[type];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = maskFn(e.target.value);
    onChange!(e);
  };

  return <input {...rest} type="text" onChange={handleOnChange} />;
}
