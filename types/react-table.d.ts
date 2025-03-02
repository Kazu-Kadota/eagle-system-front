import type { FilterFn, RankingInfo, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // Add fuzzy filter types
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }

  // Extend meta for columns
  interface TableColumnMeta {
    className?: string;
  }
  interface ColumnMeta<TData extends RowData, TValue> extends TableColumnMeta {}
}
