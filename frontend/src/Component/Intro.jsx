import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/login");
  };
  return (
    <div>
      <Header />
      <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-amber-50 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center">
          Welcome to <span className="text-blue-500">𝓚𝓐𝓝𝓑𝓐𝓝</span> Board
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl text-center text-[1rem] sm:text-[1.1rem]">
          Organize your tasks, boost your productivity, and manage your projects
          with ease. Sign up now and start your journey toward better workflow
          management.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            className="bg-amber-400 text-black font-medium px-6 py-2 rounded hover:bg-transparent hover:border hover:border-amber-400 hover:cursor-pointer"
            onClick={handleLogIn}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
