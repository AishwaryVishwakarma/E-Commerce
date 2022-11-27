import React from "react";
import classes from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Products from "../Products/Products";
import Orders from "../Orders/Orders";
import Customers from "../Customers/Customers";
import Reports from "../Reports/Reports";
import Integrations from "../Integrations/Integrations";
const Home = () => {
  return (
    <>
      <div className={classes.home}>
        <Sidebar />
        <div className={classes.content}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/integrations" element={<Integrations />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
