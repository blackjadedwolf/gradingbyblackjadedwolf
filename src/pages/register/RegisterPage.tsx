import React, { useState } from "react";
import { register } from "services/api";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (email && password && confirmPassword && firstName && lastName && phoneNumber) {
      register({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      }).catch((error) => {
        alert(error);
      });
    } else {
      alert("Missing info in form!")
    }
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit} style={FormStyles}>
      <div className="login-header">Create An Account</div>

      <Form.Group controlId="f_name">
        <Form.Control
          required
          style={{ width: "20rem", marginTop: "2rem" }}
          placeholder="First Name"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Enter your first name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="l_name">
        <Form.Control
          required
          style={{ width: "20rem" }}
          placeholder="Last Name"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Enter your last name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="phone_number">
        <Form.Control
          required
          style={{ width: "20rem" }}
          type="tel"
          placeholder="Phone Number"
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />

        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Enter your phone number
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Control
          required
          style={{ width: "20rem" }}
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
          style={{ width: "20rem" }}
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
        <Form.Control
          required
          style={{ width: "20rem" }}
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
      <div style={BtnWrap}>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
          <Col>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default RegisterPage;

const FormStyles = {
  marginTop: "4rem",
  height: "38.3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
} as React.CSSProperties;

const BtnWrap = {
  display: "flex",
  marginTop: "1rem",
  alignItems: "center",
  justifyContent: "center",
} as React.CSSProperties;
