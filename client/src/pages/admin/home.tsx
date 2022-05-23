import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

import AdminWrapper from "../../components/admin/wrapper";
import ButtonEl from "../../components/atoms/Button";
import InputEl from "../../components/atoms/Input";
import {
  formatResponseMessage,
  SERVER_ROOT_URL,
  tokenHeader,
} from "../../hooks/helpers";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const [data, setData] = React.useState({ profession: "", service: "" });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createProfession = async () => {
    if (data.profession === "") return;
    const t = toast.loading("Creating new profession");
    try {
      await axios.post(
        SERVER_ROOT_URL + "/professions/add",
        JSON.stringify({ name: data.profession }),
        { headers: tokenHeader.headers }
      );
      toast.update(t, {
        render: "Created a profession",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err: any) {
      toast.update(t, {
        render:
          formatResponseMessage(err.message) || "Error in creating profession",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const createService = async () => {
    if (data.service === "") return;
    const t = toast.loading("Creating new service");
    try {
      await axios.post(
        SERVER_ROOT_URL + "/services/add",
        JSON.stringify({ name: data.service }),
        { headers: tokenHeader.headers }
      );
      toast.update(t, {
        render: "Created a service",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err: any) {
      toast.update(t, {
        render:
          formatResponseMessage(err.message) || "Error in creating service",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <AdminWrapper>
      <div className="my-8">
        <div className="hover:bg-lightHover p-8 rounded-md">
          <h2 className="text-center mb-4">Create a new Profession</h2>
          <div className="flex justify-center items-center gap-2">
            <InputEl
              type="text"
              name="profession"
              value={data.profession}
              onChange={changeHandler}
              placeholder="Enter profession"
            />
            <ButtonEl label="Create" callback={createProfession} />
          </div>
        </div>
        <div className="hover:bg-lightHover p-8 rounded-md">
          <h2 className="mb-2 text-center">Create a new Service</h2>
          <div className="flex justify-center items-center gap-2">
            <InputEl
              type="text"
              name="service"
              value={data.service}
              onChange={changeHandler}
              placeholder="Enter service"
            />
            <ButtonEl label="Create" callback={createService} />
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Home;
