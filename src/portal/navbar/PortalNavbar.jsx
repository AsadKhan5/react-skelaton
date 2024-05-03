import React from "react";
import { useNavigate } from "react-router-dom";

const PortalNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <nav className="bg-dark flex items-center justify-between px-4 py-3 shadow-lg">
      <div className="flex flex-row mx-auto">
        <h1 className="font-bold text-2xl ">React Auth Demo | Portal</h1>
        <button onClick={logout} className="btn btn-warning mx-10">
          Logout
        </button>
        <p className="text-xs font-bold">This is fixed navbar </p>
      </div>
    </nav>
  );
};

export default PortalNavbar;
