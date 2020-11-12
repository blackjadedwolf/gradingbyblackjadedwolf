import React, { useState } from "react";

import { Modal, Form, Button, Col } from "react-bootstrap";

import { Card, User } from "models";
import { saveOrder } from "services/api";
import { PlusCircle, Trash } from "react-bootstrap-icons";
// import "./CardEntryForm.css";

type Props = {
  setOrderID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CardEntryForm = (props: Props) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [submissionLevel, setSubmissionLevel] = useState<string>();
  const [cards, setCards] = useState<Card[]>();

  const [quantity, setQuantity] = useState<number>();
  const [playerName, setPlayerName] = useState<string>();
  const [year, setYear] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();
  const [product, setProduct] = useState<string>();
  const [estimatedValue, setEstimatedValue] = useState<string>();

  const [showModal, setShowModal] = useState(false);
  const { setOrderID } = { ...props };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !submissionLevel ||
      !cards
    ) {
      if(!firstName) {
        console.log("no first name")
      }
      if(!lastName) {
        console.log("no last name")
      }
      if(!email) {
        console.log("no email")
      }
      if(!phoneNumber) {
        console.log("no number")
      }
      if(!submissionLevel) {
        console.log("no level")
      }
      if(!cards) {
        console.log("no cards")
      }
    } else {
      await saveOrder(submissionLevel, cards, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      }).then((orderDoc) => {
        setOrderID(orderDoc.id);
      });
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>Don't sue us</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        name="dynamic_card_entry_form"
        onSubmit={onSubmit}
        autoComplete="off"
        className="form"
      >
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First Name"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your first name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last Name"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your last name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
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
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="123-456-7890"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your phone number
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="submissionLevel">
          <Form.Label>Submission Level</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={(event) => {
              setSubmissionLevel(event.target.value);
            }}
          >
            <option>20 Day | $25.00</option>
            <option>10 Day | $50.00</option>
            <option>5 Day | $80.00</option>
            <option>Bulk</option>
          </Form.Control>
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please choose a submission level
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label>Enter Cards</Form.Label>
        <Form.Row>
          <Col>
            <Form.Control
              required
              placeholder="Quantity"
              onChange={(event) => {
                setQuantity(Number(event.target.value));
              }}
            />
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Player Name"
              onChange={(event) => {
                setPlayerName(event.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Year"
              onChange={(event) => {
                setYear(event.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Brand"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Card Number"
              onChange={(event) => {
                setCardNumber(event.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Product"
              onChange={(event) => {
                setProduct(event.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Estimated Value"
              onChange={(event) => {
                setEstimatedValue(event.target.value);
              }}
            />
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (
                  !quantity ||
                  !playerName ||
                  !year ||
                  !brand ||
                  !cardNumber ||
                  !product ||
                  !estimatedValue
                ) {
                  console.log("empty field in card");
                } else {
                  const newCard: Card = {
                    quantity: quantity,
                    player_name: playerName,
                    year: Number(year),
                    brand: brand,
                    product: product,
                    card_number: Number(cardNumber),
                    estimated_value: Number(estimatedValue),
                  };
                  if (cards) {
                    setCards([...cards, newCard]);
                  } else {
                    setCards([newCard]);
                  }

                  setQuantity(undefined);
                  setPlayerName(undefined);
                  setYear(undefined);
                  setBrand(undefined);
                  setCardNumber(undefined);
                  setProduct(undefined);
                  setEstimatedValue(undefined);
                }
              }}
            >
              <PlusCircle />
            </Button>
          </Col>
        </Form.Row>
        {cards &&
          cards.map((card) => {
            return (
              <Form.Row>
                <Col>
                  <Form.Control readOnly placeholder={String(card.quantity)} />
                </Col>
                <Col>
                  <Form.Control readOnly placeholder={card.player_name} />
                </Col>
                <Col>
                  <Form.Control readOnly placeholder={String(card.year)} />
                </Col>
                <Col>
                  <Form.Control readOnly placeholder={card.brand} />
                </Col>
                <Col>
                  <Form.Control
                    readOnly
                    placeholder={String(card.card_number)}
                  />
                </Col>
                <Col>
                  <Form.Control readOnly placeholder={card.product} />
                </Col>
                <Col>
                  <Form.Control
                    readOnly
                    placeholder={String(card.estimated_value)}
                  />
                </Col>
                <Col>
                  <Button
                    onClick={() => {
                      setCards(cards.filter((c) => c !== card));
                    }}
                  >
                    <Trash />
                  </Button>
                </Col>
              </Form.Row>
            );
          })}
        <Form.Check
          required
          type="checkbox"
          label="I agree to the following terms"
        />
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Terms
        </Button>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};
