import MaterialTable, { Icons } from "material-table";
import React from "react";

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
  Add: React.forwardRef(() => <AddBox />),
  Check: React.forwardRef(() => <Check />),
  Clear: React.forwardRef(() => <Clear />),
  Delete: React.forwardRef(() => <DeleteOutline />),
  DetailPanel: React.forwardRef(() => <ChevronRight />),
  Edit: React.forwardRef(() => <Edit />),
  Export: React.forwardRef(() => <SaveAlt />),
  Filter: React.forwardRef(() => <FilterList />),
  FirstPage: React.forwardRef(() => <FirstPage />),
  LastPage: React.forwardRef(() => <LastPage />),
  NextPage: React.forwardRef(() => <ChevronRight />),
  PreviousPage: React.forwardRef(() => <ChevronLeft />),
  ResetSearch: React.forwardRef(() => <Clear />),
  Search: React.forwardRef(() => <Search />),
  SortArrow: React.forwardRef(() => <ArrowDownward />),
  ThirdStateCheck: React.forwardRef(() => <Remove />),
  ViewColumn: React.forwardRef(() => <ViewColumn />),
};

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

export interface IService extends IUser {
  featured: boolean;
  phone: string;
}

export interface IListedService {
  name: string;
}

export interface IProfession extends IListedService {}

export interface IColumn {
  title?: string;
  field: string;
}

export interface ITableProps {
  columns: IColumn[];
  data: Array<IUser | IService | IListedService | IProfession>;
  Title: React.ReactElement;
}

const Table = ({ columns, data, Title }: ITableProps) => {
  return (
    <div className="w-full h-full p-4 md:p-6 max-w-[1600px]">
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        title={Title}
        options={{
          headerStyle: {
            backgroundColor: "#141F31",
            position: "sticky",
            top: 0,
            overflow: "auto",
            color: "#ffffff",
            fontWeight: "bold",
          },
          debounceInterval: 1000,
          pageSizeOptions: [5, 10, 20, 50],
          maxBodyHeight: window.innerHeight - 320,
          minBodyHeight: window.innerHeight - 320,
          rowStyle: (_: any, index: number) => {
            return index % 2 ? { backgroundColor: "#e5e7eb" } : {};
          },
        }}
        style={{
          borderRadius: "0.375rem",
          backgroundColor: "#f3f4f6",
        }}
      />
    </div>
  );
};

export default Table;
