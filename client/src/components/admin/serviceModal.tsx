import axios from "axios";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  formatResponseMessage,
  SERVER_ROOT_URL,
  tokenHeader,
} from "../../hooks/helpers";
import ButtonEl from "../atoms/Button";
import InputEl from "../atoms/Input";
import ModalWrapper from "../modalWrapper";

interface IProps {
  data: any;
  showModal: "delete" | "edit" | "";
  setShowModal: React.Dispatch<React.SetStateAction<"delete" | "edit" | "">>;
}

const ServiceModal: React.FC<IProps> = ({
  data: gotData,
  showModal,
  setShowModal,
}) => {
  const close = () => setShowModal("");
  const [data, setData] = React.useState(
    showModal === "edit" ? gotData.name : gotData
  );

  const handleChange = (e: any) => {
    setData(e.target.value);
  };

  const completeProcess = async () => {
    if (showModal === "") return;
    const t = toast.loading(showModal + " in progrss");
    try {
      let body: string;
      if (showModal === "edit") {
        body = JSON.stringify({
          serviceId: gotData.id,
          name: data,
        });
      } else {
        body = JSON.stringify({
          serviceId: gotData,
        });
      }
      const res = await axios.post(
        SERVER_ROOT_URL + "/admin/service/" + showModal,
        body,
        tokenHeader
      );
      close();
      toast.update(t, {
        render:
          formatResponseMessage(res.data.message) || showModal + " successful",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err: any) {
      close();
      toast.update(t, {
        render: formatResponseMessage(err.message) || "Error in " + showModal,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    if (showModal === "edit") {
      console.log({
        name: data,
      });
    }
  };

  return (
    <ModalWrapper close={close}>
      {showModal === "delete" ? (
        <div className="text-lightBgOne mb-6 text-center">
          <p className="text-xl">Are you sure ?</p>
          <p>Are you sure you want to delete this service ?</p>
          <p>
            This will affect all listings and users who have this as a service
          </p>
          <p>This is permanent and cannot be recovered back</p>
        </div>
      ) : (
        <div>
          <InputEl
            name="data"
            value={data}
            type="text"
            onChange={handleChange}
          />
        </div>
      )}
      <div className="flex flex-col w-full">
        <ButtonEl
          label={showModal}
          iconAfter
          bgColor={
            showModal === "delete" ? "bg-buttonDanger" : "bg-buttonSuccess"
          }
          Icon={<FaCheck />}
          callback={completeProcess}
        />
      </div>
    </ModalWrapper>
  );
};

export default ServiceModal;
