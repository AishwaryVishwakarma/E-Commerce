import React from "react";
import { Routes, Route } from "react-router-dom";
import Login_Signup from "./components/Login-Signup/Login-Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login_Signup />} />
    </Routes>
  );
}

export default App;
