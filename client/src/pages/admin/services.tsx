import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRecoilValue } from "recoil";
const Table = React.lazy(() => import("../../components/admin/table"));

import useData from "../../hooks/useData";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";
import AdminWrapper from "../../components/admin/wrapper";
import { services as servicesAtom } from "../../store/data";
import ServiceModal from "../../components/admin/serviceModal";

interface IProps {}

const Services: React.FC<IProps> = () => {
  const [editData, setEditData] = React.useState({
    id: "",
    name: "",
  });
  const [showModal, setShowModal] = React.useState<"delete" | "edit" | "">("");
  const [deleteData, setDeleteData] = React.useState("");

  const services = useRecoilValue(servicesAtom);
  const { getServices } = useData();
  const checked = React.useRef(false);

  if (!checked.current && services.length === 0) {
    getServices();
    checked.current = true;
  }

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

  if (!services) {
    return <Loader />;
  }

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table columns={columns} data={services} title="Listed Services" />

        {showModal && (
          <ServiceModal
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

export default Services;
