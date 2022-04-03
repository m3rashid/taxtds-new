import { MdError } from "react-icons/md";
import Header from "../components/mainHeader";
import Footer from "../components/mainFooter";

const NotFound = () => {
  // TODO handle OG tags
  document.title = "Taxtds - 404 Not Found";
  return (
    <>
      <Header />
      <div className="h-[50vh] w-screen flex items-center justify-center">
        <div className="flex flex-col gap-1 items-center justify-center bg-accentTwo rounded-md px-[10px] md:px-[25px] py-[25px] md:py-[50px] shadow-xl">
          <div className="flex items-center gap-4">
            <MdError color="error" />
            <h1 className="font-bold text-xl text-buttonDanger">Not Found</h1>
          </div>
          <p className="font-semibold">The requested page was not found</p>
          <a href="/" className="font-semibold hover:text-buttonSuccess">
            Go to Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
