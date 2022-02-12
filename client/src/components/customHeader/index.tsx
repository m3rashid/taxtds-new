import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Home from "@material-ui/icons/Home";

interface IProps {
  username: string;
}

const Header = ({ username }: IProps) => {
  const handleLogout = () => {
    toast.success("Logged out successfully");
    toast.error("Logged out successfully");
  };

  return (
    <>
      <header className="w-[100%] bg-accentOne text-[white] h-[100px] flex items-center justify-between px-[10px] md:px-[30px] mb-[15px] shadow-xl">
        <h1 className="font-bold text-2xl ">Hello {username}</h1>
        <div className="flex flex-col md:flex-row md:gap-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <ExitToApp />
            <p className="font-semibold">Logout</p>
          </div>
          <Link to="/">
            <div className="flex items-center gap-2">
              <Home />
              <p className="font-semibold">Home</p>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
