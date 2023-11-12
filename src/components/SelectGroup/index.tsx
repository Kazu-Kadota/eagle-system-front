import { SelectItem } from 'src/types/select'
import { VariantProps, tv } from 'tailwind-variants'

const style = tv({
  slots: {
    container: 'flex',
    title: 'text-sm font-bold text-dark',
  },
  variants: {
    layout: {
      row: {
        container: 'flex-row items-center gap-4',
        title: '',
      },
      column: {
        container: 'flex-col',
        title: 'mb-1',
      },
    },
  },
  defaultVariants: {
    layout: 'column',
  },
})

interface SelectGroupProps<T> extends VariantProps<typeof style> {
  title: string
  error?: string
  items: SelectItem<T>[]
  value: T | undefined
  containerClassName?: string
  onChange: (value: T) => void
}

export const SelectGroup = <T extends string>({
  title,
  error,
  items,
  value,
  layout,
  containerClassName,
  onChange,
}: SelectGroupProps<T>) => {
  const { container: containerStyle, title: titleStyle } = style({ layout })

  return (
    <div className={containerStyle({ className: containerClassName })}>
      <h2 className={titleStyle()}>{title}</h2>
      {items.map((item) => (
        <button
          key={item.value}
          role="radio"
          type="button"
          className="flex items-center gap-2 py-1"
          onClick={() => onChange(item.value)}
        >
          {item.value === value ? (
            <span className="h-4 w-4 bg-link" />
          ) : (
            <span className="h-4 w-4 border border-placeholder" />
          )}
          <span className="text-sm font-medium text-placeholder">
            {item.label}
          </span>
        </button>
      ))}
      {!!error && <p className="-mb-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
