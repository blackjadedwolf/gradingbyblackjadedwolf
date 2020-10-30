import { Button, Layout, Space } from "antd";
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import {
  LoadingOutlined,
  WarningOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signOut, useUser } from "services/api";
import "./App.css";

import {
  Home as HomePage,
  Submissions as SubmissionsPage,
  Invoice as InvoicePage,
  Login as LoginPage,
  Register as RegisterPage,
  PasswordReset as PasswordResetPage,
  Orders as OrdersPage,
} from "pages";

import { PublicRoute, PrivateRoute } from "components";

const App = () => {
  const [user, userLoading, userError] = useUser();

  const { Header, Content } = Layout;

  const handleSignOut = async () => {
    await signOut().then(() => {
      console.log("signed out");
      return <Redirect to="/login" />;
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Space direction="vertical">
          <Space align="center" size="middle" direction="horizontal">
            <NavLink to="/">
              <Button>Home</Button>
            </NavLink>
            <NavLink to="/submit">
              <Button>Submit</Button>
            </NavLink>
            <NavLink to="/orders">
              <Button>Orders</Button>
            </NavLink>
            {userLoading ? (
              <LoadingOutlined />
            ) : user ? (
              <>
                <UserOutlined />
                <p>Hi, {user.email}</p>
                <Button onClick={handleSignOut} style={{ marginTop: 16 }}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink to="/login">
                <Button style={{ marginTop: 16 }}>Login</Button>
              </NavLink>
            )}
            {userError && <WarningOutlined />}
          </Space>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PublicRoute exact path="/login" component={LoginPage} />
            <PublicRoute exact path="/register" component={RegisterPage} />
            <Route exact path="/passwordreset" component={PasswordResetPage} />
            <Route exact path="/submit" component={SubmissionsPage} />
            <PrivateRoute exact path="/orders" component={OrdersPage} />
            <Route exact path="/invoice/:orderID" component={InvoicePage} />
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Space>
      </BrowserRouter>
    </div>
  );
};

export default App;
