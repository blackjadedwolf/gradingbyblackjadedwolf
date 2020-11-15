import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";
import { login } from "services/api";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!email || !password) {
      console.log("empty values from required inputs");
    } else {
      login(email, password).catch((error) => {
        alert(error);
      });
    }

    event.preventDefault();
  };

  return (
    <Form className="login-form" onSubmit={onSubmit} style={FormStyles}>
      <Form.Group controlId="email">
        <Form.Control
          required
          style={{width:"20rem"}}
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your email
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          required
          style={{width:"20rem"}}
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your password
        </Form.Control.Feedback>
      </Form.Group>
      <div style={BtnWrap}>
        <Row>
          <Col>
            <Button variant="primary" type="submit" className="login-btn">
              Login
            </Button>
          </Col>
          <Col>
            {" "}
            <Link to="/passwordreset">
              <Button className="login-btn">Reset </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/register">
              <Button className="login-btn">Register</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default LoginPage;

const FormStyles = {
  marginTop:"4rem",
  height: "38.3rem",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"black"
} as React.CSSProperties

const BtnWrap = {
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
} as React.CSSProperties