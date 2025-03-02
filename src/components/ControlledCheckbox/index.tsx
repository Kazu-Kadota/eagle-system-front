import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { cn } from '@/utils/classNames';
import { CheckIcon } from '@/assets/icons/CheckIcon';

interface ControlledCheckboxProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  containerClassName?: string;
}

export const ControlledCheckbox = <T extends FieldValues>({
  label,
  name,
  control,
  containerClassName,
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <button
      type="button"
      className={cn(
        'xs:gap-[0.4rem] flex items-center gap-2',
        containerClassName,
      )}
      onClick={() => onChange(!value)}
    >
      <span
        className={
          value ? 'h-4 w-4 bg-link' : 'h-4 w-4 border border-placeholder'
        }
      >
        {value && <CheckIcon className="w-4 fill-light" />}
      </span>

      <span
        className={cn(
          'text-sm',
          error?.message ? 'font-bold text-error' : 'font-semibold text-dark',
        )}
      >
        {label}
      </span>
    </button>
  );
};
