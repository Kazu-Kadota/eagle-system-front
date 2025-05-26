import ReactSelect, { type MultiValue } from 'react-select';

import { type SelectItem } from '@/types/select';
import { cn } from '@/utils/classNames';

export type MultiSelectItem = MultiValue<SelectItem>;

interface MultiSelectProps {
  placeholder: string;
  options: MultiSelectItem;
  value: MultiSelectItem;
  id?: string;
  isMulti?: boolean;
  loading?: boolean;
  disableSelection?: boolean;
  onChange: (values: MultiSelectItem) => void;
}

export function MultiSelect({
  id,
  isMulti = true,
  loading,
  disableSelection,
  onChange,
  ...rest
}: MultiSelectProps) {
  return (
    <ReactSelect
      {...rest}
      isMulti={isMulti || undefined}
      inputId={id}
      unstyled
      menuIsOpen={disableSelection ? false : undefined}
      isClearable={!disableSelection}
      isSearchable={!disableSelection}
      isLoading={loading}
      classNames={{
        control: () =>
          'rounded-sm border border-placeholder p-2 text-sm text-dark',
        placeholder: () => 'cursor-pointer text-placeholder',
        clearIndicator: () => 'cursor-pointer text-placeholder',
        dropdownIndicator: () =>
          cn('cursor-pointer text-placeholder', disableSelection && '!hidden'),
        menuList: () => 'rounded-b-sm bg-light shadow-md',
        option: ({ isFocused }) =>
          cn(
            'cursor-pointer px-3 py-1 text-dark',
            isFocused && 'bg-light-gray',
          ),
        valueContainer: () => 'flex flex-wrap gap-1',
        multiValue: ({ data }) =>
          cn(
            'rounded-md px-1',
            {
              success: 'bg-light-gray text-dark',
              error: 'bg-light-gray text-dark',
              default: 'bg-light-gray text-dark',
            }[data.type ?? 'default'],
          ),
      }}
      onChange={(values) => onChange(Array.isArray(values) ? values : [values])}
    />
  );
}
