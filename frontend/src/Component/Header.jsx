import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogIn = () => {
    navigate("/logIn");
  };

  return (
    <>
      <header className="bg-blue-500 w-full">
        <div className="flex justify-between items-center h-[5rem] px-5 sm:px-8 md:px-10 lg:px-12">
          <p className="text-white text-[1.3rem] sm:text-[1.4rem]">𝓚𝓐𝓝𝓑𝓐𝓝</p>

          <button className="sm:hidden">
            {isOpen === false ? (
              <IoMdMenu
                className="text-white text-[1.7rem]"
                onClick={handleMenu}
              />
            ) : (
              <IoClose
                className="text-white text-[1.7rem]"
                onClick={handleMenu}
              />
            )}
          </button>

          <div className="hidden gap-5 sm:flex">
            <button
              className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-6 py-2 rounded hover:cursor-pointer"
              onClick={handleLogIn}
            >
              LogIn
            </button>
            <button
              className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-6 py-2 rounded hover:cursor-pointer"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
        </div>

        {isOpen === true ? (
          <div className="flex flex-col sm:hidden w-full fixed z-50 mt-1 px-3">
            <button
              className="bg-amber-400 font-bold rounded text-[1rem] px-4 py-3 shadow hover:bg-amber-500 hover:cursor-pointer"
              onClick={handleLogIn}
            >
              LogIn
            </button>
            <button
              className="bg-amber-400 font-bold mt-1 rounded text-[1rem] px-4 py-3 shadow hover:bg-amber-500 hover:cursor-pointer"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default Header;
