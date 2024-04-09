import { SelectItem } from 'src/types/select'

export const listNumOfItemsPerPage: SelectItem[] = [
  5, 10, 25, 50, 75, 100, 200, 500,
].map((number) => ({
  label: `${number} por página`,
  value: String(number),
}))
