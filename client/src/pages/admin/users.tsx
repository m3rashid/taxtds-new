import axios from "axios";
import moment from "moment";
import React from "react";
import { MdDelete, MdEmail, MdOutlineReadMore } from "react-icons/md";

const Table = React.lazy(() => import("../../components/admin/table"));
import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";
import { SERVER_ROOT_URL, tokenHeader } from "../../hooks/helpers";

interface IProps {}

export const Users: React.FC<IProps> = () => {
  const [users, setUsers] = React.useState([]);

  const getAllUsers = async () => {
    const res = await axios.post(
      `${SERVER_ROOT_URL}/admin/user/all`,
      JSON.stringify({}),
      tokenHeader
    );
    const users = res.data.users;
    setUsers(users);
  };

  React.useEffect(() => {
    getAllUsers().then().catch();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => <>{props.row.original.name}</>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: (props: any) => <>{props.row.original.email}</>,
      },
      {
        Header: "Experience",
        accessor: "experience",
        Cell: (props: any) => <>{props.row.original.experience} years</>,
      },
      {
        Header: "Address One",
        accessor: "addressLineOne",
        Cell: (props: any) => <>{props.row.original.addressLineOne}</>,
      },
      {
        Header: "Address Two",
        accessor: "addressLineTwo",
        Cell: (props: any) => <>{props.row.original.addressLineTwo}</>,
      },
      {
        Header: "State",
        accessor: "state",
        Cell: (props: any) => <>{props.row.original.state}</>,
      },
      {
        Header: "Joined",
        accessor: "createdAt",
        Cell: (props: any) => (
          <>{moment(props.row.original.createdAt).format("lll")}</>
        ),
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: (props: any) => (
          <div className="flex gap-4">
            <ButtonEl
              label="Send Email"
              Icon={<MdEmail />}
              bgColor="bg-blue-200"
            />
            <ButtonEl label="Show Listings" Icon={<MdOutlineReadMore />} />
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

  if (!users) {
    return <Loader />;
  }

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table columns={columns} data={users} title="Listed Users" />
      </React.Suspense>
    </AdminWrapper>
  );
};
