import { type VariantProps, tv } from 'tailwind-variants';

import { MaskInput } from '@/components/Input/MaskInput';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { Spinner } from '@/components/Spinner';
import type { SelectItem } from '@/types/select';

const labelStyle = tv({
  base: 'block font-semibold',
  variants: {
    theme: {
      dark: 'text-dark',
      primary: 'text-primary',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      '2xl': 'text-2xl',
    },
  },
  defaultVariants: {
    theme: 'dark',
    size: 'base',
  },
});

const containerStyle = tv({
  base: 'flex gap-1',
  variants: {
    layout: {
      row: 'flex-col sm:flex-row sm:items-center',
      column: 'flex-col',
    },
  },
  defaultVariants: {
    layout: 'column',
  },
});

const inputStyleSlots = tv({
  slots: {
    containerInput: 'relative flex flex-1 flex-row overflow-hidden',
    input:
      'remove-auto-fill font-poppings w-full min-w-0 flex-1 !bg-[transparent] font-light text-dark placeholder:text-placeholder disabled:opacity-100',
    loadingContainer: 'absolute right-0 flex h-full w-4 items-center',
  },
  variants: {
    size: {
      xs: {
        containerInput: 'h-5 min-h-[1.25rem]',
        input: 'pl-0.5 pr-2 text-md',
      },
      sm: {
        containerInput: 'h-6 min-h-[1.5rem]',
        input: 'pl-2 pr-2 text-sm',
      },
      md: {
        containerInput: 'h-7 min-h-[1.75rem]',
        input: 'px-2 text-sm',
      },
      base: {
        containerInput: 'h-11 min-h-[2.75rem]',
        input: 'px-3 text-base',
      },
    },
    disabled: {
      true: {
        containerInput: 'rounded bg-light-primary',
        loadingContainer: 'bg-light-primary',
      },
      false: {
        containerInput: 'rounded-[1px] border border-placeholder bg-light',
        loadingContainer: 'bg-light',
      },
    },
  },
  defaultVariants: {
    size: 'base',
    disabled: false,
  },
});

export type InputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'cpf'
  | 'cnpj'
  | 'cpfOrCnpj'
  | 'date'
  | 'plate';

export interface InputProps {
  label?: string;
  containerClassName?: string;
  error?: string;
  type?: InputType;
  containerVariants?: VariantProps<typeof containerStyle>;
  labelVariants?: VariantProps<typeof labelStyle>;
  inputVariants?: VariantProps<typeof inputStyleSlots>;
  items?: SelectItem[];
  loading?: boolean;
  name: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  showEmptyValue?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

const inputComponentByType: { [key in InputType]: React.ElementType } = {
  text: 'input',
  number: 'input',
  email: 'input',
  password: PasswordInput,
  cpf: MaskInput,
  cnpj: MaskInput,
  cpfOrCnpj: MaskInput,
  date: MaskInput,
  plate: MaskInput,
};

export function Input({
  label,
  name,
  error,
  labelVariants,
  containerVariants,
  inputVariants = {},
  containerClassName,
  items,
  placeholder,
  loading,
  required,
  disabled = false,
  showEmptyValue = true,
  value,
  type = 'text',
  onChange,
  ...rest
}: InputProps) {
  const {
    input: inputStyle,
    containerInput: containerInputStyle,
    loadingContainer: loadingContainerStyle,
  } = inputStyleSlots({ ...inputVariants, disabled });

  const commonProps = {
    id: name,
    value,
    disabled: disabled || loading,
    className: inputStyle({
      className:
        !value &&
        disabled &&
        'disabled:text-placeholder/50 disabled:placeholder:text-placeholder/50',
    }),
    onChange,
  };

  const renderSelect = () => (
    <select {...commonProps}>
      {showEmptyValue && (
        <option key="" value="">
          {placeholder ?? 'Selecione um item'}
        </option>
      )}
      {items!.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );

  const renderInput = () => {
    const InputComponent = inputComponentByType[type];

    return (
      <InputComponent
        {...commonProps}
        {...rest}
        type={type}
        size={inputVariants.size}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div className={containerClassName}>
      <div className={containerStyle(containerVariants)}>
        {!!label && (
          <label htmlFor={name} className={labelStyle(labelVariants)}>
            {required && <span className="text-error">*</span>}
            {label}
          </label>
        )}
        <div className={containerInputStyle()}>
          {items ? renderSelect() : renderInput()}
          {loading && (
            <div className={loadingContainerStyle()}>
              <Spinner className="w-3 fill-placeholder" />
            </div>
          )}
        </div>
      </div>
      {!!error && <p className="-mb-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
