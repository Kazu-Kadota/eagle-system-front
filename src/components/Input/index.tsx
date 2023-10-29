import { VariantProps, tv } from 'tailwind-variants'
import { PasswordInput } from './PasswordInput'

const labelStyle = tv({
  base: 'mb-1 block font-semibold',
  variants: {
    theme: {
      dark: 'text-dark',
      primary: 'text-primary',
    },
    size: {
      xs: 'text-xs',
      base: 'text-base',
      '2xl': 'text-2xl',
    },
  },
  defaultVariants: {
    theme: 'dark',
    size: 'base',
  },
})

export type InputType = 'text' | 'password' | 'email'

export interface InputProps extends React.ComponentProps<'input'> {
  label: string
  containerClassName?: string
  error?: string
  type?: InputType
  labelVariants?: VariantProps<typeof labelStyle>
}

const inputComponentByType = {
  text: 'input',
  email: 'input',
  password: PasswordInput,
}

export function Input({
  label,
  name,
  error,
  containerClassName,
  labelVariants,
  type = 'text',
  ...rest
}: InputProps) {
  const InputComponent = inputComponentByType[type]

  return (
    <div className={containerClassName}>
      <label htmlFor={name} className={labelStyle(labelVariants)}>
        {label}
      </label>
      <div className="flex h-11 flex-row border border-placeholder">
        <InputComponent
          {...rest}
          id={name}
          type={type}
          className="remove-auto-fill font-poppings min-w-0 flex-1 bg-light p-3 text-md font-light text-dark placeholder:text-placeholder"
        />
      </div>
      {!!error && <p className="-mb-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
