import ReactSelect, {
  ClassNamesConfig,
  GroupBase,
  MultiValue,
} from 'react-select'
import { SelectItem } from 'src/types/select'
import { cn } from 'src/utils/classNames'

type MultiSelectItem = MultiValue<SelectItem>

interface MultiSelectProps {
  placeholder: string
  options: MultiSelectItem
  value: MultiSelectItem
  id?: string
  onChange: (values: MultiSelectItem) => void
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
    cn('cursor-pointer px-3 py-1 text-dark', isFocused && 'bg-link/20'),
  valueContainer: () => 'flex flex-wrap gap-1',
  multiValue: () => 'rounded-sm text-dark bg-light-gray px-1',
}

export function MultiSelect({ id, ...rest }: MultiSelectProps) {
  return (
    <ReactSelect
      {...rest}
      isMulti
      inputId={id}
      unstyled
      classNames={classNames}
    />
  )
}
