import React from "react";
import classes from "./Navbar.module.css";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineFullscreen,
  AiOutlineBell,
} from "react-icons/ai";
import { BsMoon } from "react-icons/bs";
import { MdOutlineWidgets } from "react-icons/md";
import { userContext } from "../../Home/Home";

const Navbar = () => {
  const ctx = React.useContext(userContext);

  return (
    <div className={classes.navbar}>
      <div className={classes.search_field}>
        <AiOutlineSearch
          style={{
            fontSize: "1.1rem",
            color: "#9e9e9e",
          }}
        />
        <input type="text" placeholder="Search" />
      </div>
      <div className={classes.icons}>
        <MdOutlineWidgets />
        <AiOutlineShopping />
        <AiOutlineFullscreen />
        <BsMoon
          style={{
            fontSize: "1.3rem",
          }}
        />
        <AiOutlineBell />
      </div>
      <div className={classes.profile}>
        <p>{ctx.name}</p>
      </div>
    </div>
  );
};

export default Navbar;
