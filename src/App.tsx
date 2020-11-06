import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";

import { signOut, useUser } from "services/api";

import {
  Home as HomePage,
  Submissions as SubmissionsPage,
  Invoice as InvoicePage,
  Login as LoginPage,
  Register as RegisterPage,
  PasswordReset as PasswordResetPage,
  Orders as OrdersPage,
} from "pages";

import { PublicRoute, PrivateRoute, Header, Hero, About, Footer } from "components";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Person, ExclamationTriangle, Clock } from "react-bootstrap-icons";
import './assets/styles/theme_styles.css';

const App = () => {
  const [user, userLoading, userError] = useUser();

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      return <Redirect to="/login" />;
    });
  };

  return (
    <div className="App">
      <Header/>
      <Hero/>
      <About/>
      <Footer/>
    </div>
  );
};

export default App;
