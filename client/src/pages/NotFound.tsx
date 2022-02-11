import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/mainHeader";
import Footer from "../components/mainFooter";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="h-[50vh] w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-accentTwo rounded-md px-[10px] md:px-[25px] py-[25px] md:py-[50px] shadow-xl">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-buttonDanger"
            />
            <h1 className="font-bold text-xl text-buttonDanger">Not Found</h1>
          </div>
          <p className="font-semibold">The requested page was not found</p>
        </div>
      </div>
      {/* Not found message */}
      <Footer />
    </>
  );
};

export default NotFound;
