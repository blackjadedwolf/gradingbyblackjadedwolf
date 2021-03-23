import React, { useState } from "react";
import { Modal, Form, Button, Col, Card } from "react-bootstrap";
import {
  SubmittedCard,
  SubmissionLevelsBeforeMar012021,
  SubmissionLevels,
  Order,
  User,
  SubmissionLevel,
} from "models";
import { saveOrder, updateOrder } from "services/api";
import { PlusCircle, Trash } from "react-bootstrap-icons";
import "./CardEntryForm.css";

type Props = {
  user?: firebase.default.User;
  userProfile?: Partial<User>;
  isAdmin: boolean;
} & (
  | {
      setOrderID: React.Dispatch<React.SetStateAction<string | undefined>>;
    }
  | {
      initialOrder: Order;
      setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    }
);

export const CardEntryForm = (props: Props) => {
  const {
    setOrderID,
    initialOrder,
    setShowEditModal,
    user,
    userProfile,
    isAdmin,
  } = {
    ...props,
  };

  // Price change occured on March 01 2021, we are supporting old orders for a while
  const orderDate = initialOrder?.dateCreated
    ? new Date(initialOrder.dateCreated)
    : undefined;

  const isOrderBeforeMar012021 =
    orderDate && orderDate < new Date("March 01 2021");

  const [firstName, setFirstName] = useState<string | undefined>(
    initialOrder?.firstName ?? (!isAdmin ? userProfile?.firstName : undefined)
  );
  const [lastName, setLastName] = useState<string | undefined>(
    initialOrder?.lastName ?? (!isAdmin ? userProfile?.lastName : undefined)
  );
  const [email, setEmail] = useState<string | undefined>(
    initialOrder?.email ?? (!isAdmin ? user?.email ?? undefined : undefined)
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    initialOrder?.phoneNumber ??
      (!isAdmin ? userProfile?.phoneNumber ?? undefined : undefined)
  );


  /* If order uses old submission level, this field is irrelevent because
     it is readonly on the form. If it is a fresh order or order since price
     update it will have SubmissionLevel type */
  const [submissionLevel, setSubmissionLevel] = useState<
    SubmissionLevel | undefined
  >(initialOrder?.submissionLevel as SubmissionLevel);
  const [cards, setCards] = useState<SubmittedCard[] | undefined>(
    initialOrder?.cards
  );

  const [psaID, setPSAID] = useState<number | undefined>(initialOrder?.psa_id);

  const [quantity, setQuantity] = useState<number | null>();
  const [playerName, setPlayerName] = useState<string | null>();
  const [year, setYear] = useState<string | null>();
  const [brand, setBrand] = useState<string | null>();
  const [cardNumber, setCardNumber] = useState<string | null>();
  const [product, setProduct] = useState<string | null>();
  const [estimatedValue, setEstimatedValue] = useState<string | null>();
  const [showTermsModal, setShowTermsModal] = useState(false);

  const validateCardValueInput = (input: string) => {
    let inputPrice = 0;
    let maxPrice = 0;
    if (!(estimatedValue === null || estimatedValue === undefined)) {
      inputPrice = parseInt(input, 10);
      maxPrice = submissionLevel?.maxDeclaredvalue;
    }
    return inputPrice > maxPrice ? false : true;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Make sure all fields are set
    if (
      firstName &&
      lastName &&
      email &&
      phoneNumber &&
      submissionLevel &&
      cards
    ) {
      // setOrderID is set when being called from submissions page
      if (setOrderID) {
        await saveOrder(submissionLevel, cards, {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        }).then((orderID) => {
          setOrderID(orderID);
        });
      }
      // initialOrder and setShowEditModal are set when being called from edit modal on order page
      else if (initialOrder && setShowEditModal) {
        await updateOrder({
          ...initialOrder,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          submissionLevel: submissionLevel,
          cards: cards,
          // Avoid crash related to updating with an unset psaID by only including it if it is set
          ...(psaID && { psa_id: psaID }),
        }).then(() => {
          setShowEditModal(false);
        });
      }
    } else {
      alert("Missing info in form!");
    }
  };

  return (
    <div className="mt-5 pb-5">
      <Modal
        show={showTermsModal}
        onHide={() => {
          setShowTermsModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I agree not to submit any items with which bear evidence of trimming,
          recoloring, restoration or any other form of tampering, or are of
          questionable authenticity. <br></br>
          <br></br>I agree that in the event PSA rejects any items for grading,
          PSA shall not refund the amount paid by customer because the
          determination to reject an item requires a review by PSA's graders and
          authenticators. <br></br>
          <br></br>
          If items are submitted for services for which they do not qualify, I
          authorize PSA to correct the order and charge any additional
          authentication, grading, handling, and shipping fees that may apply.
          Turnaround time does not begin until order has been places into
          grading. <br></br>
          <br></br>
          Inability to follow the above terms and conditions will result in
          being banned from Grading by BlackJadedWolf Inc. <br></br>
          <br></br>
          *Blackjadedwolf Inc & GradingByBlackjadedwolf Inc is not liable for
          items that are lost or damaged in transit. It is your responsibility
          to pack and secure items safely. Please fully Insure and Acquire Adult
          Signature Confirmation to all packages shipped to our Office.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowTermsModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <p>User profile: {userProfile?.id}</p>
      <Form
        name="dynamic_card_entry_form"
        onSubmit={onSubmit}
        autoComplete="off"
        className="form"
      >
        <div className="form-group-1">
          <Form.Group controlId="firstName">
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              value={firstName}
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
            <Form.Control
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
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
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
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
            <Form.Control
              required
              type="text"
              placeholder="Phone #"
              value={phoneNumber}
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
            <Form.Control
              required
              as="select"
              placeholder="Submission Level"
              readOnly={initialOrder && isOrderBeforeMar012021}
              value={isOrderBeforeMar012021 ? initialOrder?.submissionLevel : submissionLevel.name}
              onChange={(event) => {
                if(initialOrder) {
                  if(isOrderBeforeMar012021) {
                    // DO NOTHING

                    // let subLevel: SubmissionLevelsBeforeMar012021;

                    // switch (event.target.value) {
                    //   case SubmissionLevelsBeforeMar012021.Standard5.toString():
                    //     subLevel = SubmissionLevelsBeforeMar012021.Standard5;
                    //     break;
                    //   case SubmissionLevelsBeforeMar012021.Standard10.toString():
                    //     subLevel = SubmissionLevelsBeforeMar012021.Standard10;
                    //     break;
                    //   case SubmissionLevelsBeforeMar012021.Standard20.toString():
                    //     subLevel = SubmissionLevelsBeforeMar012021.Standard20;
                    //     break;
                    //   case SubmissionLevelsBeforeMar012021.BulkBefore1971.toString():
                    //     subLevel = SubmissionLevelsBeforeMar012021.BulkBefore1971;
                    //     break;
                    //   case SubmissionLevelsBeforeMar012021.Bulk1971to2016.toString():
                    //     subLevel = SubmissionLevelsBeforeMar012021.Bulk1971to2016;
                    //     break;
                    //   case SubmissionLevelsBeforeMar012021.BulkAfter2017.toString():
                    //     subLevel = SubmissionLevelsBeforeMar012021.BulkAfter2017;
                    //     break;
                    //   default:
                    //     throw new Error(
                    //       "Invalid argument in submission level selection switch statement"
                    //     );
                    // }
                    // setSubmissionLevel(subLevel);
                  }
                } else {
                  const match: SubmissionLevel | undefined = SubmissionLevels.find((level) => level.name === event.target.value);
                  if(match) {
                    setSubmissionLevel(match)
                  }
                }
              }}
            >
              <option value="none" selected disabled hidden>
                Please choose a submission level
              </option>
              {/* {Object.entries(SubmissionLevelsBeforeMar012021).map((entry) => {
                return (
                  <option key={entry[0]} value={entry[1]}>
                    {entry[1]}
                  </option>
                );
              })} */}
              {SubmissionLevels.map(level => (
                <option key={level.name} value={level.name}>
                  {`${level.name} | Cost per card ${level.cost} | Max DV ${level.maxDeclaredvalue}`}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a submission level
            </Form.Control.Feedback>
          </Form.Group>
          {/* Only show PSA ID Entry if coming from edit order page */}
          {initialOrder && (
            <Form.Group controlId="psaID">
              <Form.Control
                type="text"
                placeholder="PSA ID"
                value={psaID}
                onChange={(event) => {
                  setPSAID(Number(event.target.value));
                }}
              />
            </Form.Group>
          )}
        </div>
        {submissionLevel && (
          <>
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Quantity"
                  value={quantity ? String(quantity) : ""}
                  onChange={(event) => {
                    setQuantity(Number(event.target.value));
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Player Name"
                  value={playerName ? playerName : ""}
                  onChange={(event) => {
                    setPlayerName(event.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Year"
                  value={year ? year : ""}
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Brand"
                  value={brand ? brand : ""}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Card Number"
                  value={cardNumber ? cardNumber : ""}
                  onChange={(event) => {
                    setCardNumber(event.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Product"
                  value={product ? product : ""}
                  onChange={(event) => {
                    setProduct(event.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Declared Value"
                  value={estimatedValue ? estimatedValue : ""}
                  onChange={(event) => {
                    let isValidPrice = validateCardValueInput(
                      event.target.value
                    );
                    isValidPrice
                      ? setEstimatedValue(event.target.value)
                      : alert(
                          "Card declared value should not exceed maximum declared value of this submission type"
                        );
                  }}
                />
              </Col>
            </Form.Row>
            <Button
              className="add-card"
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
                  alert("Please fill out all fields before adding card!");
                } else {
                  const newCard: SubmittedCard = {
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
                  setQuantity(null);
                  setPlayerName(null);
                  setYear(null);
                  setBrand(null);
                  setCardNumber(null);
                  setProduct(null);
                  setEstimatedValue(null);
                }
              }}
            >
              <PlusCircle style={{ color: "white", paddingRight: "5px" }} />
              Add Card
            </Button>
            {cards &&
              cards.map((card) => {
                return (
                  <Card style={{ marginBottom: "2rem" }}>
                    <Card.Body>
                      <div className="card-row">
                        <div className="card-col">
                          <span>
                            <strong>Quantity</strong>
                          </span>
                          <span>{String(card.quantity)}</span>
                        </div>
                        <div className="card-col">
                          <span>
                            <strong>Player</strong>
                          </span>
                          <span>{String(card.player_name)}</span>
                        </div>
                        <div className="card-col">
                          <span>
                            <strong>Year</strong>
                          </span>
                          <span>{String(card.year)}</span>
                        </div>
                        <div className="card-col">
                          <span>
                            <strong>Brand</strong>
                          </span>
                          <span>{String(card.brand)}</span>
                        </div>
                        <div className="card-col">
                          <span>
                            <strong>Card Number</strong>
                          </span>
                          <span>{String(card.card_number)}</span>
                        </div>
                        <div className="card-col">
                          <span>
                            <strong>Product</strong>
                          </span>
                          <span>{String(card.product)}</span>
                        </div>
                        <div className="card-col">
                          <span>
                            <strong>Declared Value</strong>
                          </span>
                          <span>{String(card.estimated_value)}</span>
                        </div>
                        <Button
                          onClick={() => {
                            setCards(cards.filter((c) => c !== card));
                          }}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            <Form.Check
              style={{
                marginTop: "1.5rem",
                color: "white",
                fontFamily: "Montserrat",
                fontSize: "1rem",
                fontWeight: "bolder",
              }}
              required
              type="checkbox"
              label="I agree to the following terms"
            />
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  marginRight: "2rem",
                  border: "2px solid #1EBC9B !important",
                  backgroundColor: "black",
                }}
                onClick={() => {
                  setShowTermsModal(true);
                }}
              >
                Terms
              </Button>
              <Button
                type="submit"
                style={{
                  border: "2px solid #1EBC9B",
                  backgroundColor: "black",
                }}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
