import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import ReactPaginate from 'react-paginate'
import { PageArrowLeftIcon, PageArrowRightIcon } from 'src/assets/icons'
import { Button, ButtonProps } from 'src/components'
import { Analysis } from 'src/models'
import { ValueOf } from 'src/types/utils'

export interface TableProps<T> {
  title?: string
  data: T[]
  columns: ColumnDef<T, ValueOf<T>>[]
  actions?: ButtonProps[]
  pageCount?: number
  className?: string
  onClick?: (item: T) => void
}

export const AnalysisTable = <T extends Analysis>({
  data,
  columns,
  title,
  actions,
  className,
  pageCount = 25,
  onClick,
}: TableProps<T>) => {
  const table = useReactTable<T>({
    data,
    columns,
    initialState: {
      pagination: { pageSize: pageCount },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const numOfItemsSeen = Math.min((pageIndex + 1) * pageSize, data.length)
  const currentPageCount = table.getPageCount()

  return (
    <div className={className}>
      {!!title && (
        <div className="flex flex-col flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-t-sm border-b border-line-light bg-light-gray px-4 py-2 md:flex-row md:justify-start">
          <h3 className="text-white text-3xl font-extrabold">{title}</h3>
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
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

      <div className="max-w-full overflow-x-auto">
        {data.length > 0 && (
          <table className="w-full table-fixed bg-light text-center">
            <thead className="border-b border-line-light bg-primary">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="xs:text-sm h-10 w-28 p-0.5 text-base font-bold text-light"
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
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
                    'cursor-pointer transition-opacity hover:opacity-50'
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="w-28 border-b border-line-light px-0.5 py-[0.375rem] text-[0.8125rem] font-medium uppercase"
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

      <div className="flex flex-col items-center justify-between gap-2 rounded-b-lg bg-light px-4 pb-3 pt-4 sm:flex-row sm:py-[0.35rem]">
        <p className="text-xs font-bold text-primary">
          Mostrando {numOfItemsSeen} de {data.length} solicitações
        </p>
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
  )
}
