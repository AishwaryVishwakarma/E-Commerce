import React from "react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";

const Home = () => {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }
  return (
    <Routes>
      <Route path="/" element={<Sidebar />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Home;
