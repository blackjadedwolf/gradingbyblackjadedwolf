import React from "react";
import { Nav, Button, NavLink } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { signOut, useUser } from "services/api";

const Header = () => {
  const [user, userLoading, userError] = useUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      return <Redirect to="/login" />;
    });
  };

  return (
    <Nav
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
              <Link
                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                id="custom_nav"
                to="/submit"
              >
                {" "}
                Submissions{" "}
              </Link>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <Link
                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                to="/orders"
              >
                {" "}
                Orders{" "}
              </Link>
            </li>
            {user ? (
              <li className="nav-item mx-0 mx-lg-1">
                <Button
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  onClick={handleSignOut}
                >
                  {" "}
                  LOGOUT
                </Button>
              </li>
            ) : (
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/login"
                >
                  {" "}
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export default Header;
