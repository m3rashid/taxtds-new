import React from "react";
import { useRecoilValue } from "recoil";
import { ImArrowRight2 } from "react-icons/im";
import { createSearchParams, useNavigate } from "react-router-dom";

import useData from "../hooks/useData";
import ButtonEl from "../components/atoms/Button";
import { listingPagination } from "../store/data";

interface IProps {}

// implement this with url params to persist data

const Pagination: React.FC<IProps> = () => {
  const { getListings } = useData();
  const pagination = useRecoilValue(listingPagination);

  const loadMore = () => {
    getListings({
      page: pagination.currentPage + 1,
    });
  };

  return (
    <div className="flex flex-col gap-2 mt-10">
      <div className="flex gap-2 justify-center">
        <ButtonEl
          label="Load More"
          Icon={<ImArrowRight2 />}
          iconAfter={true}
          callback={loadMore}
          disabled={!pagination.hasMore}
          compact={true}
        />
      </div>
    </div>
  );
};

export default Pagination;
