import React from "react";
import classes from "./Sidebar.module.css";
import {
  AiOutlineArrowLeft,
  AiOutlineSetting,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { RiDashboardFill, RiShoppingBasket2Fill } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = React.useState(true);
  const [currentTab, setCurrentTab] = React.useState("home");

  function toggleSidebar() {
    setSidebar((prev) => !prev);
  }

  function tabHandler(tab) {
    setCurrentTab(tab);
  }

  function getClassName(tab) {
    if (sidebar) {
      return currentTab === tab
        ? `${classes.sidebar__items__open} ${classes.active}`
        : classes.sidebar__items__open;
    } else {
      return currentTab === tab
        ? `${classes.sidebar__items__close} ${classes.active}`
        : classes.sidebar__items__close;
    }
  }

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }

  return (
    <nav className={classes.sidebar__container}>
      <div className={classes.toggle__button__open} onClick={toggleSidebar}>
        {sidebar ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
      </div>
      <ul>
        <li className={getClassName("home")} onClick={() => tabHandler("home")}>
          <RiDashboardFill />
          <span>Dashboard</span>
        </li>
        <li
          className={getClassName("products")}
          onClick={() => tabHandler("products")}
        >
          <MdProductionQuantityLimits />
          <span>Products</span>
        </li>
        <li
          className={getClassName("orders")}
          onClick={() => tabHandler("orders")}
        >
          <RiShoppingBasket2Fill />
          <span>Orders</span>
        </li>
        <li
          className={getClassName("customers")}
          onClick={() => tabHandler("customers")}
        >
          <BsFillPeopleFill />
          <span>Customers</span>
        </li>
        <li
          className={getClassName("reports")}
          onClick={() => tabHandler("reports")}
        >
          <HiDocumentReport />
          <span>Reports</span>
        </li>
        <li
          className={getClassName("integrations")}
          onClick={() => tabHandler("integrations")}
        >
          <AiOutlineSetting />
          <span>Integrations</span>
        </li>
      </ul>
      {sidebar ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <div className={classes.logout__button} onClick={logoutHandler}>
          <BiLogOutCircle />
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
