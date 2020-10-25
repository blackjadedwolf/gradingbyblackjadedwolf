import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";

import {
  Admin as AdminPage,
  Home as HomePage,
  Submissions as SubmissionsPage,
  Invoice as InvoicePage,
} from "./pages";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/submit">Submit</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/submit" component={SubmissionsPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/invoice/:orderID" component={InvoicePage} />
          <Route exact path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
