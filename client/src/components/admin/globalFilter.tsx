import React from "react";
import { useAsyncDebounce } from "react-table";
import { MdSearch } from "react-icons/md";

import Input from "../atoms/Input";

interface IProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}

export const GlobalFilter: React.FC<IProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      <Input
        type="text"
        Icon={<MdSearch size={25} />}
        border={false}
        value={value || ""}
        name="search"
        onChange={(e: any) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
};
