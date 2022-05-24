import axios from "axios";
import { SetterOrUpdater, useSetRecoilState } from "recoil";

import {
  listingPagination,
  listings,
  professions,
  services,
} from "../store/data";
import { useSearchParams } from "react-router-dom";
import { IListing, IProfession, IService } from "../store/interfaces";
import { defaultHeader, SERVER_ROOT_URL, tokenHeader } from "./helpers";

const useData = () => {
  const body = JSON.stringify({});

  const setListings = useSetRecoilState(listings);
  const setListingPagination = useSetRecoilState(listingPagination);
  const setProfessions = useSetRecoilState(professions);
  const setServices = useSetRecoilState(services);
  // const [params] = useSearchParams();

  const getServices = async () => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/services/all`,
        body,
        defaultHeader
      );
      const services: IService[] = res.data.services.map((service: any) => ({
        label: service.name,
        value: service._id,
      }));
      setServices(services);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getProfessions = async () => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/professions/all`,
        body,
        defaultHeader
      );
      const professions: IProfession[] = res.data.professions.map(
        (profession: any) => ({
          label: profession.name,
          value: profession._id,
        })
      );
      setProfessions(professions);
    } catch (err: any) {
      console.log(err);
    }
  };

  interface IGetListings {
    page?: number;
    limit?: number;
    setPageParams?: SetterOrUpdater<any>;
  }

  const getListings = async ({ page, limit, setPageParams }: IGetListings) => {
    if (!page) page = 0;
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/listings/all`,
        JSON.stringify({ page, limit }),
        tokenHeader
      );
      setListingPagination && setListingPagination(res.data.pagination);
      setListings((prev: IListing[]) => {
        const listings = [...prev, ...res.data.listings];
        const ids = listings.map((o) => o._id);

        const newListings = listings
          .filter(({ _id }, index) => !ids.includes(_id, index + 1))
          .sort((a: IListing, b: IListing) => (a.featured ? -1 : 1));
        return newListings;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {};

  return {
    getServices,
    getProfessions,
    getListings,
    getUsers,
  };
};

export default useData;
