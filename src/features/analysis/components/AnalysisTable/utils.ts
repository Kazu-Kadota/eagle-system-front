import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import { FilterFn } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const fuzzyFilter: FilterFn<unknown> = (
  row,
  columnId,
  value,
  addMeta,
) => {
  const searchValue = value.trim()
  const rowValue = row.getValue(columnId)
  const itemRank = rankItem(rowValue, searchValue)

  addMeta({ itemRank })

  return itemRank.passed
}
