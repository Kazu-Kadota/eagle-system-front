import { rankItem } from '@tanstack/match-sorter-utils';
import type { FilterFn } from '@tanstack/react-table';

export const fuzzyFilter: FilterFn<unknown> = (
  row,
  columnId,
  value,
  addMeta,
) => {
  const searchValue = value.trim();
  const rowValue = row.getValue(columnId);
  const itemRank = rankItem(rowValue, searchValue);

  addMeta({ itemRank });

  return itemRank.passed;
};
