import { VariantProps, tv } from 'tailwind-variants'
import { PasswordInput } from './PasswordInput'
import { SelectItem } from 'src/types/select'
import { Spinner } from '..'
import { MaskInput } from './MaskInput'

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

const containerStyle = tv({
  base: '',
  variants: {
    layout: {
      row: 'flex items-center gap-2',
      column: 'flex-col',
    },
  },
  defaultVariants: {
    layout: 'column',
  },
})

const inputStyleSlots = tv({
  slots: {
    containerInput: 'flex flex-row border border-placeholder',
    input:
      'remove-auto-fill font-poppings min-w-0 flex-1 p-3 text-base font-light text-dark placeholder:text-placeholder',
  },
  variants: {
    size: {
      sm: {
        containerInput: 'h-6',
      },
      base: {
        containerInput: 'h-11',
      },
    },
    theme: {
      light: {
        input: 'bg-light',
      },
      primaryLight: {
        input: 'bg-light-primary',
      },
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'cpf'
  | 'cpfOrCnpj'
  | 'date'
  | 'plate'

export interface InputProps extends React.ComponentProps<'input'> {
  label: string
  containerClassName?: string
  error?: string
  type?: InputType
  containerVariants?: VariantProps<typeof containerStyle>
  labelVariants?: VariantProps<typeof labelStyle>
  inputVariants?: VariantProps<typeof inputStyleSlots>
  items?: SelectItem[]
  loading?: boolean
}

const inputComponentByType: { [key in InputType]: React.ElementType } = {
  text: 'input',
  email: 'input',
  password: PasswordInput,
  cpf: MaskInput,
  cpfOrCnpj: MaskInput,
  date: MaskInput,
  plate: MaskInput,
}

export function Input({
  label,
  name,
  error,
  labelVariants,
  containerVariants,
  inputVariants,
  containerClassName,
  items,
  placeholder,
  loading,
  disabled,
  required,
  type = 'text',
  ...rest
}: InputProps) {
  const { input: inputStyle, containerInput: containerInputStyle } =
    inputStyleSlots(inputVariants)

  const commonProps = {
    id: name,
    disabled: disabled || loading,
    className: inputStyle(),
  }

  const renderSelect = () => (
    <select {...commonProps}>
      <option key="" value="">
        {placeholder ?? 'Selecione um item'}
      </option>
      {items!.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )

  const renderInput = () => {
    const InputComponent = inputComponentByType[type]

    return (
      <InputComponent
        {...commonProps}
        {...rest}
        type={type}
        placeholder={placeholder}
      />
    )
  }

  return (
    <div
      className={containerStyle({
        ...containerVariants,
        className: containerClassName,
      })}
    >
      <label htmlFor={name} className={labelStyle(labelVariants)}>
        {required && <span className="text-error">*</span>}
        {label}
      </label>
      <div className={containerInputStyle()}>
        {items ? renderSelect() : renderInput()}
        {loading && (
          <div className="bg-white absolute right-0 flex h-full w-3 items-center">
            <Spinner className="w-2 fill-dark" />
          </div>
        )}
      </div>
      {!!error && <p className="-mb-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
