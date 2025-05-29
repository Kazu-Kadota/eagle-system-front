import ReactSelect, {
  type ClassNamesConfig,
  type GroupBase,
  type MultiValue,
} from 'react-select';

import { type SelectItem } from '@/types/select';
import { cn } from '@/utils/classNames';

export type MultiSelectItem = MultiValue<SelectItem>;

interface MultiSelectProps {
  placeholder: string;
  options: MultiSelectItem;
  value: MultiSelectItem;
  id?: string;
  isMulti?: boolean;
  onChange: (values: MultiSelectItem) => void;
}

const classNames: ClassNamesConfig<
  SelectItem<string>,
  true,
  GroupBase<SelectItem<string>>
> = {
  control: () => 'rounded-sm border border-placeholder p-2 text-sm text-dark',
  placeholder: () => 'cursor-pointer text-placeholder',
  clearIndicator: () => 'cursor-pointer text-placeholder',
  dropdownIndicator: () => 'cursor-pointer text-placeholder',
  menuList: () => 'rounded-b-sm bg-light shadow-md',
  option: ({ isFocused }) =>
    cn('cursor-pointer px-3 py-1 text-dark', isFocused && 'bg-light-gray'),
  valueContainer: () => 'flex flex-wrap gap-1',
  multiValue: () => 'rounded-sm text-dark bg-light-gray px-1',
};

export function MultiSelect({
  id,
  isMulti = true,
  onChange,
  ...rest
}: MultiSelectProps) {
  return (
    <ReactSelect
      {...rest}
      isMulti={isMulti || undefined}
      inputId={id}
      unstyled
      classNames={classNames}
      onChange={(values) => onChange(Array.isArray(values) ? values : [values])}
    />
  );
}
