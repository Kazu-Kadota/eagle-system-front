import { PageArrowLeftIcon } from '@/assets/icons/PageArrowLeftIcon';
import { PageArrowRightIcon } from '@/assets/icons/PageArrowRightIcon';
import { SortArrowDownIcon } from '@/assets/icons/SortArrowDownIcon';
import { SortArrowUpIcon } from '@/assets/icons/SortArrowUpIcon';
import { fuzzyFilter } from '@/components/AnalysisTable/utils';
import { Button, type ButtonProps } from '@/components/Button';
import { Input } from '@/components/Input';
import { listNumOfItemsPerPage } from '@/constants/table';
import type { Analysis, AnalysisType } from '@/models';
import { useConfigStoreActions } from '@/store/config';
import { cn } from '@/utils/classNames';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';

export interface TableProps<T> {
  analysisType: AnalysisType;
  title?: string;
  data: T[];
  columns: ColumnDef<T, string>[];
  actions?: ButtonProps[];
  className?: string;
  pageCount?: number;
  onClick?: (item: T) => void;
}

export const AnalysisTable = <T extends Analysis>({
  data,
  columns,
  title,
  actions,
  className,
  analysisType,
  pageCount,
  onClick,
}: TableProps<T>) => {
  const { getNumOfItemsPerPage, setNumOfItemsPerPage: savePageSize } =
    useConfigStoreActions();

  const initialPageSize = useMemo(
    () => pageCount || getNumOfItemsPerPage(analysisType) || 25,
    [pageCount, analysisType, getNumOfItemsPerPage],
  );

  const table = useReactTable<T>({
    data,
    columns,
    initialState: {
      pagination: { pageSize: initialPageSize },
    },
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: 'fuzzy',
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    pagination: { pageIndex, pageSize },
  } = table.getState();

  const rowCount = table.getRowCount();
  const currentPageCount = table.getPageCount();
  const numOfItemsSeen = Math.min((pageIndex + 1) * pageSize, rowCount);

  const handleOnChangePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(e.target.value);

    table.setPageSize(newPageSize);

    if (!pageCount) {
      savePageSize(analysisType, newPageSize);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    table.setGlobalFilter(e.target.value);

  return (
    <div className={className}>
      {!!title && (
        <div className="flex flex-col flex-wrap items-center justify-center gap-x-5 gap-y-6 rounded-t-sm border-b border-line-light bg-light-gray px-4 py-4 sm:gap-y-3 sm:py-2 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <h3 className="text-white text-3xl font-extrabold">{title}</h3>
            <Input
              placeholder="Pesquisar na tabela..."
              name="itemsPerPage"
              inputVariants={{ size: 'sm' }}
              labelVariants={{ size: 'xs' }}
              containerVariants={{ layout: 'row' }}
              onChange={handleSearchChange}
              containerClassName="-mb-1 min-w-[15rem] flex-1"
            />
          </div>
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:pr-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  className="px-3"
                  shadow="base"
                  {...action}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          'max-w-full overflow-x-auto',
          !title && 'rounded-t-[3px]',
        )}
      >
        {data.length > 0 && (
          <table className="w-full table-fixed bg-light text-center">
            <thead className="border-b border-line-light bg-primary">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        'xs:text-sm h-10 w-28 text-base font-bold text-light',
                        header.column.getCanSort() && 'cursor-pointer',
                        header.column.columnDef.meta?.className,
                      )}
                    >
                      <span className="flex items-center justify-center p-0.5">
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        {
                          {
                            asc: (
                              <SortArrowUpIcon className="w-6 min-w-6 text-light" />
                            ),
                            desc: (
                              <SortArrowDownIcon className="w-6 min-w-6 text-light" />
                            ),
                          }[header.column.getIsSorted() as string]
                        }
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.original.request_id}
                  onClick={onClick ? () => onClick(row.original) : undefined}
                  className={
                    onClick &&
                    'cursor-pointer transition-colors hover:bg-primary/10'
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'w-28 overflow-hidden text-ellipsis border-b border-line-light px-0.5 py-[0.375rem] text-[0.8125rem] font-medium uppercase',
                        cell.column.columnDef.meta?.className,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col-reverse items-center justify-between gap-5 rounded-b-[3px] bg-light px-4 pb-3 pt-4 sm:flex-row sm:gap-6 sm:py-2">
        <p className="flex-1 text-xs font-bold text-primary">
          Mostrando {numOfItemsSeen} de {rowCount} solicitações
        </p>

        <Input
          label="Exibir:"
          name="itemsPerPage"
          value={pageSize.toString()}
          items={listNumOfItemsPerPage}
          inputVariants={{ size: 'xs' }}
          labelVariants={{ size: 'xs' }}
          containerVariants={{ layout: 'row' }}
          showEmptyValue={false}
          onChange={handleOnChangePageSize}
        />

        {currentPageCount > 0 && (
          <ReactPaginate
            breakLabel="..."
            onPageChange={({ selected }) => table.setPageIndex(selected)}
            pageRangeDisplayed={7}
            forcePage={pageIndex}
            pageCount={currentPageCount}
            marginPagesDisplayed={1}
            previousLabel={
              <PageArrowLeftIcon className="-mb-[0.05rem] w-3 stroke-primary" />
            }
            nextLabel={
              <PageArrowRightIcon className="-mb-[0.05rem] w-3 stroke-primary" />
            }
            pageClassName="text-primary leading-none px-[0.08rem]"
            pageLinkClassName="text-sm font-semibold underline"
            activeLinkClassName="no-underline"
            previousClassName="px-1"
            nextClassName="px-1"
            containerClassName="flex items-center"
          />
        )}
      </div>
    </div>
  );
};
