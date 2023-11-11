import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import type { SelectItem } from 'src/types/util';

type RadioGroupStyleType = 'col' | 'row';

export interface RegisteredRadioGroupProps<T extends FieldValues> {
  title: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  error?: string;
  items: SelectItem[];
  disabled?: boolean;
  styleType?: RadioGroupStyleType;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}
