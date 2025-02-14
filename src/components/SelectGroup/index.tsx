import { tv, type VariantProps } from 'tailwind-variants';

import type { SelectItem } from '@/types/select';

const style = tv({
  slots: {
    container: 'relative flex',
    title: 'text-sm font-bold text-dark',
  },
  variants: {
    layout: {
      row: {
        container: 'flex-col lg:flex-row lg:items-center lg:gap-4',
        title: 'mb-1 lg:mb-0',
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
});

export interface SelectGroupProps<T> extends VariantProps<typeof style> {
  title: string;
  error?: string;
  items: SelectItem<T>[];
  value: T | undefined;
  containerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: T) => void;
}

export const SelectGroup = <T extends string>({
  title,
  error,
  items,
  value,
  layout,
  containerClassName,
  disabled,
  required,
  onChange,
}: SelectGroupProps<T>) => {
  const { container: containerStyle, title: titleStyle } = style({ layout });

  return (
    <div className={containerStyle({ className: containerClassName })}>
      <h2 className={titleStyle()}>
        {required && <span className="text-error">*</span>}
        {title}
      </h2>
      {items.map((item) => (
        <button
          key={item.value}
          role="radio"
          type="button"
          aria-checked={item.value === value}
          className="flex items-center gap-2 py-1"
          onClick={onChange ? () => onChange(item.value) : undefined}
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
      {disabled && <span className="absolute inset-0 bg-[transparent]" />}
    </div>
  );
};
