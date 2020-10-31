


import React from "react";
import { register } from "services/api";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

const RegisterPage = () => {
  const onSubmit = (values: any) => {
    console.log("values", values)
    register(values.email, values.password).catch((error) => {
      alert(error);
    });
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
          <Link to="/login">
            <Button>Register</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterPage;
