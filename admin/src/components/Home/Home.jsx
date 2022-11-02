import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Home;
