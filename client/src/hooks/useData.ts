import axios from "axios";
import { SetterOrUpdater } from "recoil";

import { defaultHeader, SERVER_ROOT_URL, tokenHeader } from "./helpers";
import { IProfession, IService } from "../store/interfaces";

const useData = () => {
  // const controller = new AbortController();

  // const CancelToken = axios.CancelToken;
  // const source = CancelToken.source();

  const body = JSON.stringify({});
  const headers = {
    headers: defaultHeader.headers,
  };

  const getServices = async (setRecoilState: SetterOrUpdater<IService[]>) => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/services/all`,
        body,
        headers
      );
      const services: IService[] = res.data.services.map((service: any) => ({
        label: service.name,
        value: service._id,
      }));
      setRecoilState(services);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getProfessions = async (
    setRecoilState: SetterOrUpdater<IProfession[]>
  ) => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/professions/all`,
        body,
        headers
      );
      const professions: IProfession[] = res.data.professions.map(
        (profession: any) => ({
          label: profession.name,
          value: profession._id,
        })
      );
      setRecoilState(professions);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getListings = async (setRecoilState: SetterOrUpdater<any>) => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/listings/all`,
        body,
        tokenHeader
      );
      setRecoilState(res.data.listings);
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
