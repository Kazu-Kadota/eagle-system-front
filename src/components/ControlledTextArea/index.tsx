import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { TextArea, type TextAreaProps } from '@/components/TextArea';

export interface ControlledTextAreaProps<T extends FieldValues>
  extends Omit<TextAreaProps, 'value' | 'onChange' | 'name' | 'error'> {
  name: Path<T>;
  control: Control<T>;
}

export const ControlledTextArea = <T extends FieldValues>({
  name,
  control,
  ...rest
}: ControlledTextAreaProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextArea
      {...rest}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={name}
      error={error?.message}
    />
  );
};
