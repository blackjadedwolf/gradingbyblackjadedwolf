import React from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect, NavLink } from "react-router-dom";
import { signOut, useUser } from "services/api";

const Header = () => {
  const [user] = useUser();

  const isAdmin =
  user?.email === "gradingbyblackjadedwolf@gmail.com" ||
  (process.env.NODE_ENV === "development" && user?.email === "test@test.com");

  const handleSignOut = async () => {
    await signOut().then(() => {
      return <Redirect to="/login" />;
    });
  };

  return (
    <nav
    className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
    id="mainNav"
    style={{width:"100vw"}}
    >
      <div className="container">
        <Link className="navbar-brand js-scroll-trigger" to="/">
          BlackjadedWolf
        </Link>
        <Button
          className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold text-white rounded"
          id="mobile-menu"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu &nbsp;
          <i className="fas fa-bars"></i>
        </Button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mx-0 mx-lg-1">
        <NavLink 
          exact
          activeClassName="active"
          className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
          to="/submit"
          >
            {" "}Submissions{" "}
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-1">
        <NavLink 
          exact 
          activeClassName="active"
          className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
          to="/orders"
        >
          {" "}Orders{" "}
        </NavLink>
      </li>
      {!isAdmin?
      <li className="nav-item mx-0 mx-lg-1">
        <NavLink 
          exact 
          activeClassName="active"
          className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
          to="/orders"
        >
          {" "}Profile{" "}
        </NavLink>
      </li> : null}
      {user ? (
      <li className="nav-item mx-0 mx-lg-1">
        <Button
          className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
          id="custom-logout"
          onClick={handleSignOut}
        >
          LOGOUT
        </Button>
      </li>
    ) : (
      <li className="nav-item mx-0 mx-lg-1">
        <NavLink 
          exact 
          activeClassName="active"
          className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
          to="/login"
        >
          Login
        </NavLink>
      </li>
    )}
    </ul>
    </div>
    </div>
  </nav>
  )
}

export default Header;
