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
  // console.log("Sidebar rendered");
  const navigate = useNavigate();

  const [sidebar, setSidebar] = React.useState(true);
  const [currentTab, setCurrentTab] = React.useState("home");

  React.useEffect(() => {
    const isSidebarOpen = localStorage.getItem("sidebar");
    if (isSidebarOpen === null) {
      localStorage.setItem("sidebar", "true");
      setSidebar(true);
    } else {
      setSidebar(isSidebarOpen === "true");
    }
  }, []);

  function toggleSidebar() {
    localStorage.setItem("sidebar", !sidebar);
    setSidebar((sidebar) => !sidebar);
  }

  function tabHandler(tab) {
    setCurrentTab(tab);
    if (tab === "home") {
      navigate(`/${tab}`);
    } else {
      navigate(`/home/${tab}`);
    }
  }

  function getClassName(tab) {
    const path = window.location.pathname.split("/")[2];
    if (sidebar) {
      switch (path) {
        case undefined:
          return currentTab === tab
            ? `${classes.sidebar__items__open} ${classes.active}`
            : classes.sidebar__items__open;
        default:
          return path === tab
            ? `${classes.sidebar__items__open} ${classes.active}`
            : classes.sidebar__items__open;
      }
    } else {
      switch (path) {
        case undefined:
          return currentTab === tab
            ? `${classes.sidebar__items__close} ${classes.active}`
            : classes.sidebar__items__close;
        default:
          return path === tab
            ? `${classes.sidebar__items__close} ${classes.active}`
            : classes.sidebar__items__close;
      }
    }
  }

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("sidebar");
    localStorage.removeItem("userInfo");
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
          {!sidebar && <span className={classes.tooltiptext}>Dashboard</span>}
        </li>
        <li
          className={getClassName("products")}
          onClick={() => tabHandler("products")}
        >
          <MdProductionQuantityLimits />
          <span>Products</span>
          {!sidebar && <span className={classes.tooltiptext}>Products</span>}
        </li>
        <li
          className={getClassName("orders")}
          onClick={() => tabHandler("orders")}
        >
          <RiShoppingBasket2Fill />
          <span>Orders</span>
          {!sidebar && <span className={classes.tooltiptext}>Orders</span>}
        </li>
        <li
          className={getClassName("customers")}
          onClick={() => tabHandler("customers")}
        >
          <BsFillPeopleFill />
          <span>Customers</span>
          {!sidebar && <span className={classes.tooltiptext}>Customers</span>}
        </li>
        <li
          className={getClassName("reports")}
          onClick={() => tabHandler("reports")}
        >
          <HiDocumentReport />
          <span>Reports</span>
          {!sidebar && <span className={classes.tooltiptext}>Reports</span>}
        </li>
        <li
          className={getClassName("integrations")}
          onClick={() => tabHandler("integrations")}
        >
          <AiOutlineSetting />
          <span>Integrations</span>
          {!sidebar && (
            <span className={classes.tooltiptext}>Integrations</span>
          )}
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
