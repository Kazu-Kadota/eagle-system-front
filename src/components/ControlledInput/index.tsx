import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'
import { Input, InputProps } from 'src/components/Input'

interface ControlledInputProps<T extends FieldValues>
  extends Omit<InputProps, 'error' | 'value' | 'onChangeText' | 'onChange'> {
  name: Path<T>
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...rest
}: ControlledInputProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
  })

  return (
    <Input
      {...rest}
      name={name}
      value={field.value}
      error={fieldState.error?.message}
      onBlur={field.onBlur}
      onChange={field.onChange}
    />
  )
}
