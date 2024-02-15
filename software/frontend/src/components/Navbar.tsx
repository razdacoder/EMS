import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { logout } from "../slices/authSlice";
import Button from "./Button";

import { Link } from "react-router-dom";
import Logo from "../images/logo/logo-icon.svg";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const Navbar = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const disptach = useAppDispatch();
  const navigate = useNavigate();

  const userLogout = () => {
    console.log("Hi");
    disptach(logout());
    window.location.reload();
  };
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white shadow-sm dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4  md:px-6 2xl:px-11">
        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
