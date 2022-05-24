import React from "react";
import axios from "axios";
import moment from "moment";
import { MdDelete, MdEmail } from "react-icons/md";

import ButtonEl from "../../components/atoms/Button";
import { Loader } from "../../components/atoms/loader";
import AdminWrapper from "../../components/admin/wrapper";
import { SERVER_ROOT_URL, tokenHeader } from "../../hooks/helpers";
import SendAdminMailModal from "../../components/admin/sendMailModal";

const Table = React.lazy(() => import("../../components/admin/table"));

interface IProps {}

const Users: React.FC<IProps> = () => {
  const [users, setUsers] = React.useState([]);
  const [emailData, setEmailData] = React.useState<any>();
  const [showModal, setShowModal] = React.useState(false);

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
              callback={() => {
                setEmailData(props.row.original);
                setShowModal(true);
              }}
            />
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
        {showModal && (
          <SendAdminMailModal
            emailData={emailData}
            setShowModal={setShowModal}
          />
        )}
      </React.Suspense>
    </AdminWrapper>
  );
};

export default Users;
