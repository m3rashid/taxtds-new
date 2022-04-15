import React from "react";
import {
  MdDelete,
  MdEmail,
  MdFeaturedPlayList,
  MdLoop,
  MdInfoOutline,
} from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRecoilValue } from "recoil";

const Table = React.lazy(() => import("../../components/admin/table"));
import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import ButtonLink from "../../components/atoms/ButtonLink";
import { Loader } from "../../components/atoms/loader";
import { listings } from "../../store/data";
import { cloudinaryInitial } from "../../hooks/helpers";
import moment from "moment";
import useListing from "../../hooks/admin/useListing";

interface IProps {}

export const Listings: React.FC<IProps> = () => {
  const allListings = useRecoilValue(listings);
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
              callback={() => {}}
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
        <Table columns={columns} data={allListings} title="Listings" />
      </React.Suspense>
    </AdminWrapper>
  );
};
