import React from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  MdChevronLeft,
  MdChevronRight,
  MdDoubleArrow,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdSort,
} from "react-icons/md";

import { GlobalFilter } from "./globalFilter";
import { ReactSelect } from "../atoms/reactSelect";
import { Button, PageButton } from "./tableHelpers";

interface IProps {
  data: any;
  columns: any;
  title: string;
  setPagination?: (pageSize: number, pageIndex: number) => void;
}

const Table: React.FC<IProps> = ({ columns, data, title, setPagination }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  const { pageSize, pageIndex } = state;

  React.useEffect(() => {
    if (setPagination) {
      setPagination(pageSize, pageIndex);
    }
  }, [pageSize]);

  return (
    <div className="flex flex-col mt-10 justify-between bg-accentTwo rounded-md w-full max-w-[1400px] min-h-[calc(100vh_-_320px)]">
      <div className="flex flex-col flex-grow">
        <div className="p-5 pb-2 flex justify-between">
          <h1 className="font-bold text-2xl text-accentOne">{title}</h1>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div className="mt-2 sm:mt-0" key={column.id}>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
        <div className="mt-4 flex flex-col w-full">
          <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block w-full">
              <div className="overflow-auto">
                <table
                  {...getTableProps()}
                  className="w-full divide-y divide-gray-100 bg-lightBgOne"
                >
                  <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            scope="col"
                            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            <div className="flex items-center justify-between">
                              {column.render("Header")}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <MdOutlineArrowDropDown className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <MdOutlineArrowDropUp className="w-4 h-4 text-gray-400" />
                                  )
                                ) : (
                                  <MdSort className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                )}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-100"
                  >
                    {page.map((row, i) => {
                      // new
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                                role="cell"
                              >
                                {/* @ts-ignore */}
                                {cell.column.Cell?.name ===
                                "defaultRenderer" ? (
                                  <div className="text-sm text-gray-500">
                                    {cell.render("Cell")}
                                  </div>
                                ) : (
                                  cell.render("Cell")
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700 whitespace-nowrap">
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <ReactSelect
              name=""
              border={false}
              options={[5, 10, 20]}
              placeholder={`${pageSize} items`}
              setData={setPageSize}
              value={pageSize}
              single={true}
              suffix="items"
            />
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <MdDoubleArrow
                  className="h-5 w-5 text-gray-400 rotate-180"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <MdChevronLeft
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <MdChevronRight
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <MdDoubleArrow
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
