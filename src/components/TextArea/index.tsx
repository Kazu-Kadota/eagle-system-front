export interface TextAreaProps extends React.ComponentProps<'textarea'> {
  name: string
  label: string
  error?: string
}

export function TextArea({
  label,
  error,
  name,
  disabled,
  ...rest
}: TextAreaProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={`textarea-${name}`}
        className="mb-2 block text-sm font-bold"
      >
        {label}
      </label>
      <textarea
        {...rest}
        name={name}
        disabled={disabled}
        id={`textarea-${name}`}
        placeholder={!disabled ? 'Insira o texto aqui' : undefined}
        className="h-80 resize-none rounded-[1px] border border-placeholder bg-light px-3 py-3 text-sm text-dark outline-none"
      />
      {!!error && <p className="-mb-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
