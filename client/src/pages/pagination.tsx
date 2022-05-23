import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import ButtonEl from "../components/atoms/Button";
import { listingPagination } from "../store/data";
import useData from "../hooks/useData";
import { listings } from "../store/data";

const getExt = (n: number) =>
  n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

interface IProps {}

const Pagination: React.FC<IProps> = () => {
  const { getListings } = useData();
  const setListings = useSetRecoilState(listings);
  const [pagination, setListingPagination] = useRecoilState(listingPagination);
  const nthPage = getExt(pagination.currentPage + 1);

  const goPrevious = () => {
    getListings(setListings, setListingPagination, pagination.currentPage - 1);
  };

  const goNext = () => {
    getListings(setListings, setListingPagination, pagination.currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-2 mt-10">
      <p className="text-center -mb-2">Page {pagination.currentPage + 1}</p>
      <p className="text-center mb-2">
        {`showing ${nthPage} ${pagination.limit} out of ${pagination.count} listings`}
      </p>
      <div className="flex gap-2 justify-center">
        <ButtonEl
          label=""
          Icon={<ImArrowLeft2 />}
          callback={goPrevious}
          disabled={!pagination.hasPrevious}
          compact={true}
        />
        <ButtonEl
          label=""
          Icon={<ImArrowRight2 />}
          iconAfter={true}
          callback={goNext}
          disabled={!pagination.hasMore}
          compact={true}
        />
      </div>
    </div>
  );
};

export default Pagination;
