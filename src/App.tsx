import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Home as HomePage,
  Submissions as SubmissionsPage,
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
