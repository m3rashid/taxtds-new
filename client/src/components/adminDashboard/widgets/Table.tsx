import MaterialTable, { Icons } from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons: Icons = {
  Add: forwardRef(() => <AddBox />),
  Check: forwardRef(() => <Check />),
  Clear: forwardRef(() => <Clear />),
  Delete: forwardRef(() => <DeleteOutline />),
  DetailPanel: forwardRef(() => <ChevronRight />),
  Edit: forwardRef(() => <Edit />),
  Export: forwardRef(() => <SaveAlt />),
  Filter: forwardRef(() => <FilterList />),
  FirstPage: forwardRef(() => <FirstPage />),
  LastPage: forwardRef(() => <LastPage />),
  NextPage: forwardRef(() => <ChevronRight />),
  PreviousPage: forwardRef(() => <ChevronLeft />),
  ResetSearch: forwardRef(() => <Clear />),
  Search: forwardRef(() => <Search />),
  SortArrow: forwardRef(() => <ArrowDownward />),
  ThirdStateCheck: forwardRef(() => <Remove />),
  ViewColumn: forwardRef(() => <ViewColumn />),
};

export interface IBuyer {
  name: string;
  email: string;
}

export interface ISeller extends IBuyer {
  services: string | number;
}

export interface IColumn {
  title?: string;
  field: string;
}

export interface ITableProps {
  columns: IColumn[];
  data: Array<IBuyer | ISeller>;
  title: string;
}

const Table = ({ columns, data, title }: ITableProps) => {
  return (
    <div className="w-full p-4 md:p-6 max-w-[1400px]">
      <MaterialTable
        icons={tableIcons}
        style={{ borderRadius: "0.375rem", backgroundColor: "#D5EBF5" }}
        columns={columns}
        data={data}
        title={title}
        options={{
          pageSizeOptions: [5, 10, 20, 50, 100],
          debounceInterval: 1000,
          headerStyle: {
            backgroundColor: "#141F31",
            position: "sticky",
            top: 0,
            color: "#ffffff",
            fontWeight: 700,
          },
        }}
      />
    </div>
  );
};

export default Table;
