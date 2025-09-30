// import React, { useState } from "react";
// import Header from "./Component/Header";
// import SignUp from "./Component/SignUp";
// import LogIn from "./Component/LogIn";
// import Intro from "./Component/Intro";
// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import DashBoard from "./Component/DashBoard";
// import RefreshHandler from "./Component/RefreshHandler";

// const App = () => {
//   const [isAuthenticate, setIsAuthenticate] = useState(false);

//   const privateRouter = ({ element }) => {
//     return isAuthenticate ? element : <Navigate to="/login" />;
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Intro />,
//     },
//     {
//       path: "/login",
//       element: <LogIn />,
//     },
//     {
//       path: "/signup",
//       element: <SignUp />,
//     },
//     {
//       path: "/dashboard",
//       element: privateRouter({ element: <DashBoard /> }),
//     },
//   ]);
//   return (
//     <div>
//       {/* <RefreshHandler setIsAuthenticate={setIsAuthenticate} /> */}
//       <RouterProvider router={router} />
//       <Toaster position="top-right" reverseOrder={false} />
//     </div>
//   );
// };

// export default App;

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
        <RefreshHandler setIsAuthenticate={setIsAuthenticate} />
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
