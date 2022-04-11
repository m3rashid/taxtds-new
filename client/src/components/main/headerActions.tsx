import {
  MdAdminPanelSettings,
  MdExitToApp,
  MdHelp,
  MdLock,
  MdPerson,
  MdSearch,
  MdVpnKey,
} from "react-icons/md";

export const data = [
  {
    id: 1,
    name: "Chartered Accountant",
    urlSlug: "CA",
    to: "",
  },
  {
    id: 2,
    name: "Cost Accountant",
    urlSlug: "CMA",
    to: "",
  },
  {
    id: 3,
    name: "Company Secretory",
    urlSlug: "CS",
    to: "",
  },
  {
    id: 4,
    name: "All Professionals",
    urlSlug: "all",
    to: "",
  },
];

export const notLoggedInActions = [
  {
    name: "Quotes",
    Icon: <MdHelp />,
    modalName: "quotes",
    to: "",
  },
  {
    name: "Login",
    Icon: <MdLock />,
    modalName: "login",
    to: "",
  },
  {
    name: "Signup",
    Icon: <MdLock />,
    modalName: "signup",
    to: "",
  },
  {
    name: "Forgot Password",
    Icon: <MdVpnKey />,
    modalName: "forgot",
    to: "",
  },
  {
    name: "Reset Password",
    Icon: <MdVpnKey />,
    modalName: "reset",
    to: "",
  },
  {
    name: "Search Services",
    Icon: <MdSearch />,
    modalName: "search",
    to: "",
  },
];

export const userLoggedInActions = (userId: string) => [
  {
    name: "Profile",
    Icon: <MdPerson />,
    modalName: "",
    to: `/user/${userId}/home`,
  },
  {
    name: "Quotes",
    Icon: <MdHelp />,
    modalName: "quotes",
    to: "",
  },
  {
    name: "Change Password",
    Icon: <MdVpnKey />,
    modalName: "change",
    to: "",
  },
  {
    name: "Logout",
    Icon: <MdExitToApp />,
    modalName: "logout",
    to: "",
  },
  {
    name: "Search Services",
    Icon: <MdSearch />,
    modalName: "search",
    to: "",
  },
];

export const adminLoggedInActions = [
  {
    name: "Admin Panel",
    Icon: <MdAdminPanelSettings />,
    modalName: "",
    to: `/admin`,
  },
  {
    name: "Change Password",
    Icon: <MdVpnKey />,
    modalName: "change",
    to: "",
  },
  {
    name: "Logout",
    Icon: <MdExitToApp />,
    modalName: "logout",
    to: "",
  },
  {
    name: "Search Services",
    Icon: <MdSearch />,
    modalName: "search",
    to: "",
  },
];
