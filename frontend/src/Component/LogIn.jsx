import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "./Utils";

const LogIn = () => {
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const [showLogInErrors, setShowLoginErrors] = useState({});

  const handleSignUp = () => {
    navigate("/signUp");
  };

  const handleLogInData = (e) => {
    const { name, value } = e.target;
    const data = { ...logInData };
    data[name] = value;
    setLogInData(data);

    if (showLogInErrors[name]) {
      setShowLoginErrors((prev) => {
        return { ...prev, [name]: "" };
      });
    }
  };

  const handleLogInPage = async (e) => {
    e.preventDefault();
    try {
      const URL = "http://localhost:3000/auth/login";
      const responce = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logInData),
      });
      const result = await responce.json();

      const { field, message, success, token, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); 
      }
      if (!success) {
        const data = { ...showLogInErrors };
        data[field] = message;
        setShowLoginErrors(data);
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      <Header />
      <section className="h-[calc(100vh-5rem)] flex items-center justify-center bg-amber-50">
        <div className="bg-white p-8 rounded-2xl shadow-md sm:w-96 w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Access Your Account
          </h2>
          <form className="flex flex-col gap-2" onSubmit={handleLogInPage}>
            <input
              type="email"
              name="email"
              value={logInData.email}
              placeholder="Email"
              className={`border p-3 rounded-lg ${
                showLogInErrors.email ? "border-2 border-red-500" : ""
              }`}
              onChange={handleLogInData}
            />
            {showLogInErrors.email && (
              <div className="text-sm pl-1 text-red-500 font-bold">
                {showLogInErrors.email}
              </div>
            )}
            <input
              type="password"
              name="password"
              value={logInData.password}
              placeholder="Password"
              className={`border p-3 rounded-lg ${
                showLogInErrors.password ? "border-2 border-red-500" : ""
              }`}
              onChange={handleLogInData}
            />
            {showLogInErrors.password && (
              <div className="text-sm pl-1 text-red-500 font-bold">
                {showLogInErrors.password}
              </div>
            )}

            <button className="bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-lg font-semibold transition hover:cursor-pointer">
              LogIn
            </button>
          </form>

          <div className="flex gap-2 justify-end items-center mt-6 text-sm">
            <h1 className="text-gray-600">Don’t have an account?</h1>
            <button
              className="text-amber-500 font-semibold hover:underline hover:text-amber-600 transition hover:cursor-pointer"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
