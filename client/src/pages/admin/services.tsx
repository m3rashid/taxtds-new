import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRecoilValue } from "recoil";
const Table = React.lazy(() => import("../../components/admin/table"));

import useData from "../../hooks/useData";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";
import AdminWrapper from "../../components/admin/wrapper";
import { services as servicesAtom } from "../../store/data";

interface IProps {}

const Services: React.FC<IProps> = () => {
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
    Edit Service
    Delete Service    
  */

  if (!services) {
    return <Loader />;
  }

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table columns={columns} data={services} title="Listed Services" />
      </React.Suspense>
    </AdminWrapper>
  );
};

export default Services;
