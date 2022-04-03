import React from "react";

// // https://reactjsexample.com/a-customizable-table-component-with-react-table-and-tailwind-css/
// // use this to check

// import {
//   useTable,
//   useFilters,
//   useGlobalFilter,
//   useAsyncDebounce,
//   useSortBy,
//   usePagination,
// } from "react-table";

// interface IGlobalFilter {
//   preGlobalFilteredRows: any;
//   globalFilter: any;
//   setGlobalFilter: any;
// }

// const GlobalFilter: React.FC<IGlobalFilter> = ({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) => {
//   const count = preGlobalFilteredRows.length;
//   const [value, setValue] = React.useState(globalFilter);
//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <label className="flex gap-x-2 items-baseline">
//       <span className="text-gray-700">Search: </span>
//       <input
//         type="text"
//         className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         value={value || ""}
//         onChange={(e) => {
//           setValue(e.target.value);
//           onChange(e.target.value);
//         }}
//         placeholder={`${count} records...`}
//       />
//     </label>
//   );
// };

// interface IColumnFilter {
//   column: any;
// }

// export const SelectColumnFilter: React.FC<IColumnFilter> = ({
//   column: { filterValue, setFilter, preFilteredRows, id, render },
// }) => {
//   // Calculate the options for filtering
//   // using the preFilteredRows
//   const options = React.useMemo(() => {
//     const options = new Set();
//     preFilteredRows.forEach((row: any) => {
//       options.add(row.values[id]);
//     });
//     return [...options.values()];
//   }, [id, preFilteredRows]);

//   // Render a multi-select box
//   return (
//     <label className="flex gap-x-2 items-baseline">
//       <span className="text-gray-700">{render("Header")}: </span>
//       <select
//         className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         name={id}
//         id={id}
//         value={filterValue}
//         onChange={(e) => {
//           setFilter(e.target.value || undefined);
//         }}
//       >
//         <option value="">All</option>
//         {options.map((option, i) => (
//           <option key={i} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// };

// export function StatusPill({ value }) {
//   const status = value ? value.toLowerCase() : "unknown";

//   return (
//     <span
//       className={classNames(
//         "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
//         status.startsWith("active") ? "bg-green-100 text-green-800" : null,
//         status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
//         status.startsWith("offline") ? "bg-red-100 text-red-800" : null
//       )}
//     >
//       {status}
//     </span>
//   );
// }

// interface IAvatarCell {
//   value: any;
//   column: any;
//   row: any;
// }
// export const AvatarCell: React.FC<IAvatarCell> = ({ value, column, row }) => {
//   return (
//     <div className="flex items-center">
//       <div className="flex-shrink-0 h-10 w-10">
//         <img
//           className="h-10 w-10 rounded-full"
//           src={row.original[column.imgAccessor]}
//           alt=""
//         />
//       </div>
//       <div className="ml-4">
//         <div className="text-sm font-medium text-gray-900">{value}</div>
//         <div className="text-sm text-gray-500">
//           {row.original[column.emailAccessor]}
//         </div>
//       </div>
//     </div>
//   );
// };

// export interface IUser {
//   name: string;
//   email: string;
//   avatar?: string;
// }
// export interface IService extends IUser {
//   featured: boolean;
//   phone: string;
// }
// export interface IListedService {
//   name: string;
// }
// export interface IProfession extends IListedService {}
// export interface IColumn {
//   title?: string;
//   field: string;
// }
// export interface ITableProps {
//   columns: IColumn[];
//   data: Array<IUser | IService | IListedService | IProfession>;
//   Title: React.ReactElement;
// }

// // const Table = ({ columns, data, Title }: ITableProps) => {
// //   return (
// //     <div className="w-full h-full p-4 md:p-6 max-w-[1600px]">
// //       <MaterialTable
// //         icons={tableIcons}
// //         columns={columns}
// //         data={data}
// //         title={Title}
// //         options={{
// //           headerStyle: {
// //             backgroundColor: "#141F31",
// //             position: "sticky",
// //             top: 0,
// //             overflow: "auto",
// //             color: "#ffffff",
// //             fontWeight: "bold",
// //           },
// //           debounceInterval: 1000,
// //           pageSizeOptions: [5, 10, 20, 50],
// //           maxBodyHeight: window.innerHeight - 320,
// //           minBodyHeight: window.innerHeight - 320,
// //           rowStyle: (_: any, index: number) => {
// //             return index % 2 ? { backgroundColor: "#e5e7eb" } : {};
// //           },
// //         }}
// //         style={{
// //           borderRadius: "0.375rem",
// //           backgroundColor: "#f3f4f6",
// //         }}
// //       />
// //     </div>
// //   );
// // };

// interface ITable {
//   columns: any;
//   data: any;
// }
// const Table: React.FC<ITable> = ({ columns, data }) => {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page, // Instead of using 'rows', we'll use page,
//     // which has only the rows for the active page

//     // The rest of these things are super handy, too ;)
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,

//     state,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useFilters, // useFilters!
//     useGlobalFilter,
//     useSortBy,
//     usePagination // new
//   );

//   // Render the UI for your table
//   return (
//     <>
//       <div className="sm:flex sm:gap-x-2">
//         <GlobalFilter
//           preGlobalFilteredRows={preGlobalFilteredRows}
//           globalFilter={state.globalFilter}
//           setGlobalFilter={setGlobalFilter}
//         />
//         {headerGroups.map((headerGroup) =>
//           headerGroup.headers.map((column) =>
//             column.Filter ? (
//               <div className="mt-2 sm:mt-0" key={column.id}>
//                 {column.render("Filter")}
//               </div>
//             ) : null
//           )
//         )}
//       </div>
//       {/* table */}
//       <div className="mt-4 flex flex-col">
//         <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
//           <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//               <table
//                 {...getTableProps()}
//                 className="min-w-full divide-y divide-gray-200"
//               >
//                 <thead className="bg-gray-50">
//                   {headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column) => (
//                         // Add the sorting props to control sorting. For this example
//                         // we can add them into the header props
//                         <th
//                           scope="col"
//                           className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                           {...column.getHeaderProps(
//                             column.getSortByToggleProps()
//                           )}
//                         >
//                           <div className="flex items-center justify-between">
//                             {column.render("Header")}
//                             {/* Add a sort direction indicator */}
//                             <span>
//                               {column.isSorted ? (
//                                 column.isSortedDesc ? (
//                                   <SortDownIcon className="w-4 h-4 text-gray-400" />
//                                 ) : (
//                                   <SortUpIcon className="w-4 h-4 text-gray-400" />
//                                 )
//                               ) : (
//                                 <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
//                               )}
//                             </span>
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody
//                   {...getTableBodyProps()}
//                   className="bg-white divide-y divide-gray-200"
//                 >
//                   {page.map((row, i) => {
//                     // new
//                     prepareRow(row);
//                     return (
//                       <tr {...row.getRowProps()}>
//                         {row.cells.map((cell) => {
//                           return (
//                             <td
//                               {...cell.getCellProps()}
//                               className="px-6 py-4 whitespace-nowrap"
//                               role="cell"
//                             >
//                               {cell.column.Cell.name === "defaultRenderer" ? (
//                                 <div className="text-sm text-gray-500">
//                                   {cell.render("Cell")}
//                                 </div>
//                               ) : (
//                                 cell.render("Cell")
//                               )}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Pagination */}
//       <div className="py-3 flex items-center justify-between">
//         <div className="flex-1 flex justify-between sm:hidden">
//           <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             Previous
//           </Button>
//           <Button onClick={() => nextPage()} disabled={!canNextPage}>
//             Next
//           </Button>
//         </div>
//         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//           <div className="flex gap-x-2 items-baseline">
//             <span className="text-sm text-gray-700">
//               Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
//               <span className="font-medium">{pageOptions.length}</span>
//             </span>
//             <label>
//               <span className="sr-only">Items Per Page</span>
//               <select
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 value={state.pageSize}
//                 onChange={(e) => {
//                   setPageSize(Number(e.target.value));
//                 }}
//               >
//                 {[5, 10, 20].map((pageSize) => (
//                   <option key={pageSize} value={pageSize}>
//                     Show {pageSize}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <nav
//               className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//               aria-label="Pagination"
//             >
//               <PageButton
//                 className="rounded-l-md"
//                 onClick={() => gotoPage(0)}
//                 disabled={!canPreviousPage}
//               >
//                 <span className="sr-only">First</span>
//                 <ChevronDoubleLeftIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </PageButton>
//               <PageButton
//                 onClick={() => previousPage()}
//                 disabled={!canPreviousPage}
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </PageButton>
//               <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </PageButton>
//               <PageButton
//                 className="rounded-r-md"
//                 onClick={() => gotoPage(pageCount - 1)}
//                 disabled={!canNextPage}
//               >
//                 <span className="sr-only">Last</span>
//                 <ChevronDoubleRightIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </PageButton>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Table;
