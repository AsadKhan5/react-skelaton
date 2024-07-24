// PortalSideBar.jsx
import React from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbHomeExclamation } from "react-icons/tb";

import hrLogo from "/Hr-logo.png";

const PortalSideBar = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu py-1 px-3 w-[18rem] min-h-full bg-base-200 text-base-content">
        <div>
          <img className="w-48 my-8" src={hrLogo} />
        </div>
        <li className="my-2 font-semibold text-md">
          <NavLink to="/">
            <TbHomeExclamation className="text-xl" /> Home
          </NavLink>
        </li>
        <li className="my-2 font-semibold text-md">
          <NavLink to="/add-new-sim">
            <FaUserTie className="text-xl" /> Add Employee
          </NavLink>
        </li>
        <li className="fixed bottom-20 left-0  px-4 py-2 right-0 flex justify-center">
          <button
            className=" text-md font-semibold rounded-md"
            onClick={handleLogout}
          >
            <RiLogoutCircleLine className="inline-block mr-2 text-xl" /> Logout
          </button>
        </li>

        <li className="fixed bottom-6 font-semibold font-mono text-xs">
          Powered by Engineering and Enviromental solution
        </li>
      </ul>
    </div>
  );
};

export default PortalSideBar;
