import React from "react";
import ModalWrapper from "../modalWrapper";

interface IProps {
  emailData: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendAdminMailModal: React.FC<IProps> = ({ emailData, setShowModal }) => {
  const close = () => setShowModal(false);

  return (
    <ModalWrapper close={close}>
      <div className="text-lightBgTwo">
        <div>{JSON.stringify(emailData, null, 2)}</div>
      </div>
    </ModalWrapper>
  );
};

export default SendAdminMailModal;
