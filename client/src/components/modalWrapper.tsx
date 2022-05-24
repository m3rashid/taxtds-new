import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import CloseEl from "./atoms/Close";
import { Loader } from "./atoms/loader";

interface IProps {
  close: () => void;
  children: any;
}

const ModalWrapper: React.FC<IProps> = ({ close, children }) => {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      close();
    }
  });

  return (
    <>
      <div
        id="backdrop"
        className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-accentOne opacity-70 z-10"
      ></div>
      <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-full flex items-center justify-center z-50">
        <div
          id="modal"
          className="bg-accentTwo rounded-md z-100 px-[15px] py-[25px] md:px-[25px] md:py-[35px] flex flex-col items-end"
        >
          <CloseEl callback={close} />
          <div className="flex flex-col items-center bg-accentOne rounded-md px-[15px] pb-[25px] md:px-[25px] md:pb-[35px]">
            <React.Suspense fallback={<Loader />}>
              <div className="relative -top-[3.5rem]">
                <LazyLoadImage
                  className="rounded-full h-28 border-8 border-accentTwo"
                  src="/favicon.ico"
                  alt=""
                />
              </div>
              {children}
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
