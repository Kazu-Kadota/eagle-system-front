import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface RegisteredCheckboxProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}
