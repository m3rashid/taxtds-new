import React from "react";
import { IoSend } from "react-icons/io5";

import InputEl from "../atoms/Input";
import ButtonEl from "../atoms/Button";
import ModalWrapper from "../modalWrapper";
import { toast } from "react-toastify";
import axios from "axios";
import {
  formatResponseMessage,
  SERVER_ROOT_URL,
  tokenHeader,
} from "../../hooks/helpers";

interface IProps {
  emailData: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendAdminMailModal: React.FC<IProps> = ({ emailData, setShowModal }) => {
  const close = () => setShowModal(false);
  const [mail, setMail] = React.useState({
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendMailToUser = async () => {
    if (!mail.subject || !mail.message) {
      return;
    }
    const body = JSON.stringify({
      subject: mail.subject,
      message: mail.message,
      emailId: emailData.email,
      name: emailData.owner || emailData.name,
    });
    const t = toast.loading("Email sending");
    try {
      const res = await axios.post(
        SERVER_ROOT_URL + "/user/email",
        body,
        tokenHeader
      );
      toast.update(t, {
        render: formatResponseMessage(res.data.message) || "Email sent",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err: any) {
      toast.update(t, {
        render: formatResponseMessage(err.message) || "Error sending Email",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <ModalWrapper close={close}>
      <div className="">
        <InputEl
          name="subject"
          onChange={handleChange}
          value={mail.subject}
          type="text"
          placeholder="Subject of the email"
        />
        <textarea
          name="message"
          value={mail.message}
          onChange={handleChange}
          rows={5}
          className="rounded mb-3 px-2 py-1 w-full focus:outline-none  border-x-4 border-buttonSuccess"
          placeholder="Enter mail message"
        />
        <div className="flex flex-col w-full">
          <ButtonEl
            label="Send"
            iconAfter
            Icon={<IoSend />}
            callback={sendMailToUser}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SendAdminMailModal;
