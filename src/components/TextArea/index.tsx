import { cn } from 'src/utils/classNames'

export interface TextAreaProps extends React.ComponentProps<'textarea'> {
  name: string
  label: string
  labelRightElement?: React.ReactElement
  error?: string
  shouldShowDisableStyle?: boolean
}

export function TextArea({
  label,
  labelRightElement,
  error,
  name,
  disabled,
  placeholder,
  shouldShowDisableStyle,
  ...rest
}: TextAreaProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <label htmlFor={`textarea-${name}`} className="block text-sm font-bold">
          {label}
        </label>
        {labelRightElement}
      </div>
      <textarea
        {...rest}
        name={name}
        disabled={disabled}
        id={`textarea-${name}`}
        placeholder={
          !disabled ? placeholder ?? 'Insira o texto aqui' : undefined
        }
        className={cn(
          'h-48 resize-none rounded-[1px] border bg-light px-3 py-3 text-sm text-dark outline-none md:h-80',
          shouldShowDisableStyle && disabled
            ? 'border-placeholder/[0.45] opacity-[0.45]'
            : 'border-placeholder',
        )}
      />
      {!!error && <p className="-mb-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
