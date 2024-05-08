// App.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PortalSideBar from "./portal/sideBar/PortalSideBar";
import { RiMenu3Fill } from "react-icons/ri";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("user-token");
      setIsLoggedIn(userToken && userToken !== "undefined");
    };

    checkUserToken();
  }, []);

  const logout = () => {
    localStorage.clear(); // You might want to do additional cleanup here
    setIsLoggedIn(false);
  };

  return (
    <div className="flex">
      {isLoggedIn && (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content items-center justify-center">
            {/* Page content here */}
            <Outlet />
            <label
              htmlFor="my-drawer-2"
              className="btn btn-sm  drawer-button lg:hidden fixed top-2 right-2"
            >
              <RiMenu3Fill className="text-2xl text-secondary" />
            </label>
          </div>
          <PortalSideBar logout={logout} />
        </div>
      )}
    </div>
  );
}

export default App;
