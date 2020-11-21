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
  ViewOrder as ViewOrderPage
} from "pages";

import {
  PublicRoute,
  PrivateRoute,
  Header,
  Footer,
} from "components";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Person, ExclamationTriangle, Clock } from "react-bootstrap-icons";

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <Route exact path="/passwordreset" component={PasswordResetPage} />
          <Route exact path="/submit" component={SubmissionsPage} />
          <PrivateRoute exact path="/orders" component={OrdersPage} />
          <PrivateRoute exact path="/orders/:orderID" component={ViewOrderPage} />
          <Route exact path="/invoice/:orderID" component={InvoicePage} />
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
