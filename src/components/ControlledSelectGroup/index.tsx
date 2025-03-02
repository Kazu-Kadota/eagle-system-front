import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
  useController,
} from 'react-hook-form';

import { SelectGroup, type SelectGroupProps } from '@/components/SelectGroup';

interface ControlledSelectGroupProps<T extends FieldValues, I extends string>
  extends Omit<
    SelectGroupProps<I>,
    'error' | 'value' | 'onChangeText' | 'onChange'
  > {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
}

export function ControlledSelectGroup<T extends FieldValues, I extends string>({
  name,
  control,
  defaultValue,
  ...rest
}: ControlledSelectGroupProps<T, I>) {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
  });

  return (
    <SelectGroup
      {...rest}
      value={field.value}
      error={fieldState.error?.message}
      onChange={field.onChange}
    />
  );
}
