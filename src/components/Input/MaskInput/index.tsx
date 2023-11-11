import { maskCpf, maskCpfOrCnpj, maskDate, maskPlate } from 'src/utils/masks'
import { identity } from 'src/utils/utils'
import { InputType } from '..'

interface MaskInputProps extends React.ComponentProps<'input'> {
  type: InputType
}

const maskFnByType: { [key in InputType]: (value: string) => string } = {
  cpf: maskCpf,
  cpfOrCnpj: maskCpfOrCnpj,
  date: maskDate,
  plate: maskPlate,
  password: identity,
  text: identity,
  email: identity,
}

export function MaskInput({ onChange, type, ...rest }: MaskInputProps) {
  const maskFn = maskFnByType[type]

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = maskFn(e.target.value)
    onChange!(e)
  }

  return <input {...rest} type="text" onChange={handleOnChange} />
}
