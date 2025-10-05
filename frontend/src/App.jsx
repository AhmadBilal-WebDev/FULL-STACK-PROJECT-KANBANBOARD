import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./Component/Intro";
import LogIn from "./Component/LogIn";
import SignUp from "./Component/SignUp";
import DashBoard from "./Component/DashBoard";
import RefreshHandler from "./Component/RefreshHandler";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const PrivateRouter = ({ element }) => {
    return isAuthenticate ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <BrowserRouter>
        <RefreshHandler data={setIsAuthenticate} />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/dashboard"
            element={<PrivateRouter element={<DashBoard />} />}
          />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </div>
  );
};

export default App;
