import type { SelectItem } from 'src/types/select'

export const cnhTypes = ['A', 'B', 'AB', 'C', 'D', 'E']

export const cnhTypesSelectItems: SelectItem[] = cnhTypes.map((type) => ({
  label: type,
  value: type,
}))
