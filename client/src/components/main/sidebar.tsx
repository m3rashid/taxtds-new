import React from "react";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";

import useData from "../../hooks/useData";
import { services as servicesAtom } from "../../store/data";
import { Loader } from "../atoms/loader";

const Sidebar = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const { getServices } = useData();
  const services = useRecoilValue(servicesAtom);

  React.useEffect(() => {
    getServices().then().catch();
  }, []);

  return (
    <>
      <ul className="list-none w-[94vw] md:w-[350px] h-full mr-0 md:mr-[20px] lg:mr-[40px] pb-[20px] rounded-b-md bg-[white] rounded-md shadow-md">
        <li className="p-[15px] bg-accentOne text-[white] rounded-t-md mb-4 flex flex-row items-center justify-between">
          <p className="font-bold text-lg hover:text-buttonSuccess">
            Listed Services
          </p>
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdArrowDropDownCircle className="hover:text-accentTwo" size={26} />
          </div>
        </li>
        <React.Suspense fallback={<Loader />}>
          {services.map((service) => {
            const { label, value: serviceId } = service;
            // made id as the key
            return (
              <li
                key={serviceId}
                className={`mx-[10px] px-[10px] my-1 py-1 text-accentOne font-semibold hover:bg-lightHover hover:font-bold cursor-pointer rounded-md ${
                  !open && "hidden md:block"
                }`}
                onClick={() => {}}
              >
                {label}
              </li>
            );
          })}
        </React.Suspense>
      </ul>
    </>
  );
};

export default Sidebar;
