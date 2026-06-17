import React from "react";
import links from "./multilinks";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div>
      <article className="navbar">
        <Link className={"link-cover"} to={"/acquisition"}>
          acquisition
        </Link>
        <Link to={"/purchases"} className="link-cover">
          purchases
        </Link>
        <Link to={"/items"} className={"link-cover"}>
          items
        </Link>
        <Link to={"/add-item"} className={"link-cover"}>
          add item
        </Link>
        <Link to={"/edit-item"} className={"link-cover"}>
          edit item
        </Link>
        <Link to={"/inventory"} className={"link-cover"}>
          inventory
        </Link>
        <Link to={"/invoice"} className={"link-cover"}>
          invoice
        </Link>
        <Link to={"/usage"} className={"link-cover"}>
          usage
        </Link>
        <Link to={"/used"} className={"link-cover"}>
          used
        </Link>
        <Link to={"/usage-data"} className={"link-cover"}>
          usage data
        </Link>
      </article>
    </div>
  );
};

export default Navbar;
