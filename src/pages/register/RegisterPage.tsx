import React, { useState } from "react";
import { register } from "services/api";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!email || !password) {
      console.log("empty email from required form input");
    } else {
      register(email, password).catch((error) => {
        alert(error);
      });
    }
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="you@domain.com"
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
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
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Confirm Password"
          isInvalid={password !== confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please confirm your password
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col>
          <Button variant="primary" type="submit">Register</Button>
        </Col>
        <Col>
          <Link to="/login">
            <Button>Back to Login</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterPage;
