import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resetPassword } from "services/api";

const PasswordReset = () => {
  const [sent, setSent] = useState(false);

  const PasswordResetForm = () => {
    const [email, setEmail] = useState<string>();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (!email) {
        console.log("no email from required form");
      } else {
        resetPassword(email).then(
          () => {
            setSent(true);
          },
          (error) => {
            setSent(false);
            alert(error);
          }
        );
      }
      event.preventDefault();
    };

    return (
      <>
        <Form name="resetPassword" onSubmit={onSubmit}>
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
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Reset Password
              </Button>
            </Col>
            <Col>
              {" "}
              <Link to="/login">
                <Button>Back to Login</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/register">
                <Button>Go to Register</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </>
    );
  };

  return sent ? <p>Check your email!</p> : <PasswordResetForm />;
};

export default PasswordReset;
