export interface InputProps extends React.ComponentProps<'input'> {
  label: string
  containerClassName?: string
  error?: string
}

export function Input({
  label,
  name,
  error,
  containerClassName,
  ...rest
}: InputProps) {
  return (
    <div className={containerClassName}>
      <label
        htmlFor={name}
        className="text-dark mb-1 block text-2xl font-semibold"
      >
        {label}
      </label>
      <input
        {...rest}
        id={name}
        className="text-placeholder remove-auto-fill border-placeholder font-poppings text-md h-11 w-full min-w-0 border p-3 font-light"
      />
      {!!error && <p className="text-error -mb-3 mt-1 text-xs">{error}</p>}
    </div>
  )
}
