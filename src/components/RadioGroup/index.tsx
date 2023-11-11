import { TimesIcon } from 'src/assets/icons'

export interface RadioGroupItem<T = string> {
  label: string
  value: T
  icon?: React.ReactElement
}

export interface RadioGroupProps {
  title: string
  titleIcon?: React.ReactElement
  message?: string
  items: RadioGroupItem[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  className?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  items,
  title,
  titleIcon,
  message,
  className,
  onChange,
  value,
}) => {
  const isMultiple = Array.isArray(value)

  const handleOnChange = (item: string) => {
    if (!isMultiple) {
      onChange(item)
      return
    }

    const newValue = value.includes(item)
      ? value.filter((e) => e !== item)
      : value.concat(item)

    return onChange(newValue)
  }

  return (
    <div className={className}>
      <h2 className="flex items-center gap-2 text-base font-bold text-primary">
        {titleIcon}
        <span>{title}</span>
      </h2>
      {!!message && (
        <small className="mt-2 block text-primary/60">{message}</small>
      )}
      <div className="mt-4 flex flex-col gap-[0.65rem]">
        {items.map((item) => (
          <button
            type="button"
            key={item.value}
            onClick={() => handleOnChange(item.value)}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-sm border-[1px] border-primary">
              {(isMultiple
                ? value.includes(item.value)
                : value === item.value) && (
                <TimesIcon className="w-4 stroke-placeholder" />
              )}
            </span>
            <span className="border-border flex flex-1 items-center gap-2 rounded-md border-[1px] px-2 py-[0.4rem] sm:flex-none">
              {item.icon}
              <span className="text-sm font-bold text-primary">
                {item.label}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
