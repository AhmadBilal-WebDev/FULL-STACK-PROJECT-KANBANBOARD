import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticate(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/signup" ||
        location.pathname === "/login"
      ) {
        navigate("/dashboard");
      }
    }
  }, [location, navigate, setIsAuthenticate]);

  return <div></div>;
};

export default RefreshHandler;
