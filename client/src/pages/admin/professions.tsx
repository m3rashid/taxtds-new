import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRecoilValue } from "recoil";
const Table = React.lazy(() => import("../../components/admin/table"));

import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";
import { professions as professionsAtom } from "../../store/data";

interface IProps {}

const Professions: React.FC<IProps> = () => {
  const professions = useRecoilValue(professionsAtom);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => <>{props.row.original.label}</>,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: () => (
          <div className="flex gap-4">
            <ButtonEl label="Edit" Icon={<MdEdit />} bgColor="bg-blue-200" />
            <ButtonEl
              label="Delete"
              Icon={<MdDelete />}
              bgColor="bg-rose-500"
              textColor="text-white"
            />
          </div>
        ),
      },
    ],
    []
  );

  /*
    ===== Actions ===== 
    Edit professions
    Delete professions
  */

  if (!professions) {
    return <Loader />;
  }

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table
          columns={columns}
          data={professions}
          title="Listed Professions"
        />
      </React.Suspense>
    </AdminWrapper>
  );
};

export default Professions;
