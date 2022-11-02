import React from "react";
import { Routes, Route } from "react-router-dom";
import Login_Signup from "./components/Login-Signup/Login-Signup";
import Protected from "./components/ProtectedRoutes/Protected";
import Home from "./components/Home/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login_Signup />} />
      <Route path="/home" element={<Protected component={Home} />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
