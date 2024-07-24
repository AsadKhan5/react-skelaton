import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserToken from "../utils/token";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    // const userToken = localStorage.getItem("zYp3qCT8zehpy0qb0s2MXsRZtwFw9Y8z");
    const userToken = getUserToken();
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      navigate("/auth/login");
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  if (!isLoggedIn) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
