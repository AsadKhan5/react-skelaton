import React from "react";
import { Outlet } from "react-router-dom";
// import AuthFooter from "./footer/AuthFooter";
// import AuthNavbar from "./navbar/AuthNavbar";

const Auth = () => {
  return (
    <React.Fragment>
      {/* <AuthNavbar /> */}
      <div className="min-h-screen">
        <Outlet />
      </div>
      {/* <AuthFooter /> */}
    </React.Fragment>
  );
};

export default Auth;
