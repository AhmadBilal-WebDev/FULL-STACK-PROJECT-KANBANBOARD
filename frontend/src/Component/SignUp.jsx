import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./Utils";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showValidateError, setShowValidateError] = useState({});

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    const data = { ...signUpData };
    data[name] = value;
    setSignUpData(data);

    if (showValidateError[name]) {
      setShowValidateError((prev) => {
        return { ...prev, [name]: "" };
      });
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    try {
      const URL = "http://localhost:3000/auth/signup";
      const responce = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      const result = await responce.json();

      const { success, field, message } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      if (!success) {
        const data = { ...showValidateError };
        data[field] = message;
        setShowValidateError(data);
      }
    } catch (error) {
      handleError("something went to wrong!");
    }
  };

  console.log(showValidateError);

  return (
    <>
      <Header />
      <section className="h-[calc(100vh-5rem)] flex items-center justify-center bg-amber-50">
        <div className="bg-white p-8 rounded-2xl shadow-md sm:w-96 w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>
          <form className="flex flex-col gap-2" onSubmit={handleSubmitSignUp}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              className={`border p-3 rounded-lg ${
                showValidateError.name ? "border-2 border-red-500" : ""
              }`}
              onChange={handleInputs}
            />
            {showValidateError.name && (
              <div className="text-sm pl-1 text-red-500 font-bold">
                {showValidateError.name}
              </div>
            )}
            <input
              type="email"
              name="email"
              value={signUpData.email}
              placeholder="Email"
              className={`border p-3 rounded-lg ${
                showValidateError.email ? "border-2 border-red-500" : ""
              }`}
              onChange={handleInputs}
            />
            {showValidateError.email && (
              <div className="text-sm pl-1 text-red-500 font-bold">
                {showValidateError.email}
              </div>
            )}

            <input
              type="password"
              name="password"
              value={signUpData.password}
              placeholder="Password"
              className={`border p-3 rounded-lg ${
                showValidateError.password ? "border-2 border-red-500" : ""
              }`}
              onChange={handleInputs}
            />
            {showValidateError.password && (
              <div className="text-sm pl-1 text-red-500 font-bold">
                {showValidateError.password}
              </div>
            )}
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-lg font-semibold transition hover:cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <div className="flex gap-2 justify-end items-center mt-6 text-sm">
            <h1 className="text-gray-600">Already have an account?</h1>
            <button
              className="text-amber-500 font-semibold hover:underline hover:text-amber-600 transition hover:cursor-pointer"
              onClick={handleLogIn}
            >
              LogIn
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
