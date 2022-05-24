import React, { useState } from "react";
import {
  MdDelete,
  MdEmail,
  MdFeaturedPlayList,
  MdLoop,
  MdInfoOutline,
} from "react-icons/md";
import moment from "moment";
import { useRecoilState } from "recoil";
import { LazyLoadImage } from "react-lazy-load-image-component";

import useData from "../../hooks/useData";
import { listings } from "../../store/data";
import ButtonEl from "../../components/atoms/Button";
import useListing from "../../hooks/admin/useListing";
import { Loader } from "../../components/atoms/loader";
import { cloudinaryInitial } from "../../hooks/helpers";
import AdminWrapper from "../../components/admin/wrapper";
import ButtonLink from "../../components/atoms/ButtonLink";
import SendAdminMailModal from "../../components/admin/sendMailModal";

const Table = React.lazy(() => import("../../components/admin/table"));

interface IProps {}

const Listings: React.FC<IProps> = () => {
  const { getListings } = useData();
  const [allListings, setListings] = useRecoilState(listings);
  const [emailData, setEmailData] = React.useState<any>();
  const [showModal, setShowModal] = React.useState(false);
  const [paginationConf, setPaginationConf] = useState({
    pageSize: 5,
    pageIndex: 0,
  });

  React.useEffect(() => {
    getListings({
      page: paginationConf.pageIndex,
      limit: paginationConf.pageSize,
    })
      .then()
      .catch();
  }, [paginationConf.pageSize, paginationConf.pageIndex]);

  const changePagination = (pageSize: number, pageIndex: number) => {
    setPaginationConf({
      pageSize,
      pageIndex,
    });
  };

  const { featureUnfeature, sendEmail, deleteListing } = useListing();

  const columns = React.useMemo(
    () => [
      {
        Header: "brand Name",
        accessor: "brandName",
        Cell: (props: any) => <>{props.row.original.brandName}</>,
      },
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: (props: any) => (
          <LazyLoadImage
            className="h-16 w-16 rounded-full"
            src={cloudinaryInitial + props.row.original.avatar.url}
          />
        ),
      },
      {
        Header: "Owner",
        accessor: "owner",
        Cell: (props: any) => <>{props.row.original.owner}</>,
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: (props: any) => <>{props.row.original.phone}</>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: (props: any) => <>{props.row.original.email}</>,
      },
      {
        Header: "Listed on",
        accessor: "createdAt",
        Cell: (props: any) => (
          <>{moment(props.row.original.createdAt).format("lll")}</>
        ),
      },
      {
        Header: "Last Updated on",
        accessor: "updatedAt",
        Cell: (props: any) => (
          <>{moment(props.row.original.updatedAt).format("lll")}</>
        ),
      },
      {
        Header: "Featured",
        accessor: "featured",
        Cell: (props: any) => <>{props.row.original.featured ? "Yes" : "No"}</>,
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: (props: any) => (
          <div className="flex gap-4">
            <ButtonLink
              label="Details"
              Icon={<MdInfoOutline />}
              bgColor="bg-accentTwo"
              to={`/listings/${props.row.original._id}`}
            />
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
              label={props.row.original.featured ? "Unfeature" : "Feature"}
              Icon={
                props.row.original.featured ? (
                  <MdLoop />
                ) : (
                  <MdFeaturedPlayList />
                )
              }
              bgColor={props.row.original.featured && "bg-rose-500"}
              textColor={props.row.original.featured && "text-white"}
              callback={() => {
                featureUnfeature(
                  props.row.original._id,
                  !props.row.original.featured
                );
              }}
            />
            <ButtonEl
              label="Delete"
              Icon={<MdDelete />}
              bgColor="bg-rose-500"
              textColor="text-white"
              callback={() => {
                deleteListing(props.row.original._id);
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  if (!allListings) {
    return <Loader />;
  }

  return (
    <AdminWrapper>
      <React.Suspense fallback={<Loader />}>
        <Table
          columns={columns}
          data={allListings}
          title="Listings"
          setPagination={changePagination}
        />
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

export default Listings;
