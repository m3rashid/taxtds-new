import React from "react";
import { useRecoilValue } from "recoil";
import { MdDelete, MdEdit } from "react-icons/md";

import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";
import AdminWrapper from "../../components/admin/wrapper";
import { professions as professionsAtom } from "../../store/data";
import ProfessionModal from "../../components/admin/professionModal";

const Table = React.lazy(() => import("../../components/admin/table"));

interface IProps {}

const Professions: React.FC<IProps> = () => {
  const [editData, setEditData] = React.useState({
    id: "",
    name: "",
  });
  const [showModal, setShowModal] = React.useState<"delete" | "edit" | "">("");
  const [deleteData, setDeleteData] = React.useState("");

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
        Cell: (props: any) => (
          <div className="flex gap-4">
            <ButtonEl
              label="Edit"
              Icon={<MdEdit />}
              bgColor="bg-blue-200"
              callback={() => {
                setShowModal("edit");
                setEditData({
                  id: props.row.original.value,
                  name: props.row.original.label,
                });
              }}
            />
            <ButtonEl
              label="Delete"
              Icon={<MdDelete />}
              bgColor="bg-rose-500"
              textColor="text-white"
              callback={() => {
                setShowModal("delete");
                setDeleteData(props.row.original.value);
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

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
        {showModal && (
          <ProfessionModal
            data={
              showModal === "delete"
                ? deleteData
                : showModal === "edit"
                ? editData
                : ""
            }
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </React.Suspense>
    </AdminWrapper>
  );
};

export default Professions;
