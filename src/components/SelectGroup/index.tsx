import { SelectItem } from 'src/types/select'
import { cn } from 'src/utils/classNames'

type SelectGroupStyleType = 'col' | 'row'

interface SelectGroupProps<T> {
  title: string
  error?: string
  items: SelectItem<T>[]
  disabled?: boolean
  styleType?: SelectGroupStyleType
  className?: string
  value: T | undefined
  onChange: (value: T) => void
}

export const SelectGroup = <T extends string>({
  title,
  error,
  items,
  disabled,
  styleType = 'col',
  className,
  value,
  onChange,
}: SelectGroupProps<T>) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        styleType === 'row' ? 'gap-2 md:flex-row md:items-center md:gap-6' : '',
        className,
      )}
      role="radiogroup"
    >
      <h2
        className={
          styleType === 'row'
            ? 'mb-0 text-sm font-semibold'
            : 'mb-2 text-base font-bold text-primary'
        }
      >
        {title}
      </h2>
      {items.map((item) => (
        <div
          key={item.value}
          className={cn(
            'relative flex items-center gap-[0.4rem]',
            styleType === 'row' ? 'my-0' : ' my-2',
          )}
        >
          <input
            id={item.value}
            value={item.value}
            checked={item.value === value}
            onChange={() => onChange(item.value)}
            type="radio"
            className="h-4 w-4"
          />
          <label
            htmlFor={item.value}
            className={cn('text-sm', error ? 'text-error' : 'text-primary')}
          >
            {item.label}
          </label>
          {disabled && <span className="absolute inset-0 bg-[transparent]" />}
        </div>
      ))}
    </div>
  )
}
