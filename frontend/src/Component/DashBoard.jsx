import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./Utils";

const DashBoard = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    handleSuccess("Logged out Successfully!");
  };

  const fetchProducts = async () => {
    try {
      const URL = "http://localhost:3000/product";
      const responce = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await responce.json();
      console.log(result);
      setUserData(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
        <p className="text-xl text-red-500 text-bold">{userName}</p>
        <button
          className="bg-gray-300 px-5 py-2 rounded-lg p-1 hover:cursor-pointer"
          onClick={handleLogOut}
        >
          LOGOUT
        </button>
        {userData.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} - {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
