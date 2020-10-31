import { Button, Col, Form, Row } from "react-bootstrap";
import React from "react";
import { login } from "services/api";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const onSubmit = (values: any) => {
    // event.preventDefault();
    console.log(values)
    // login(event.email, event.password).catch((error) => {
    //   alert(error);
    // });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="you@domain.com" />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your email
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your password
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col>
          <Button type="submit">Submit</Button>
        </Col>
        <Col>
          {" "}
          <Link to="/passwordreset">
            <Button>Reset Password</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginPage;
