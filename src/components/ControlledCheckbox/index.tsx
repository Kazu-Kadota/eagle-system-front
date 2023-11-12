import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { cn } from 'src/utils/classNames'

interface ControlledCheckboxProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  error?: string
}

export const ControlledCheckbox = <T extends FieldValues>({
  label,
  name,
  control,
}: ControlledCheckboxProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className="xs:gap-[0.4rem] flex items-center gap-2">
      <input
        {...field}
        type="checkbox"
        id={`checkbox-${name}`}
        className="h-4 w-4"
      />
      <label
        htmlFor={`checkbox-${name}`}
        className={cn(
          'text-sm',
          error?.message ? 'font-bold text-error' : 'font-semibold text-dark',
        )}
      >
        {label}
      </label>
    </div>
  )
}
