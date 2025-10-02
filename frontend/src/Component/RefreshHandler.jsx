import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      data(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/signup" ||
        location.pathname === "/login"
      ) {
        navigate("/dashboard");
      }
    }
  }, [location, navigate, data]);

  return <div></div>;
};

export default RefreshHandler;
