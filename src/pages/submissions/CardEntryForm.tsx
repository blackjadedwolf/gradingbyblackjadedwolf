import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";

import { Card, User } from "models";
import { saveOrder } from "services/api";
// import "./CardEntryForm.css";

type Props = {
  setOrderID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CardEntryForm = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { setOrderID } = { ...props };

  const onSubmit = async () => {
    // let tempDetails: User = {
    //   email: values.email,
    //   firstName: values.first_name,
    //   lastName: values.last_name,
    //   phoneNumber: values.phone_number,
    // };
    // let tempCards: Card[] = [];
    // values.cards.forEach((card: any) => {
    //   let tempCard: Card = { ...card };
    //   tempCard.year = Number(card.year._d.toString().slice(11, 15));
    //   tempCards.push(tempCard);
    // });
    // await saveOrder(tempCards, tempDetails).then((orderID) => {
    //   setOrderID(orderID);
    // });
  };

  return (
    <>
    <Modal show={showModal} onHide={() => {setShowModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>Don't sue us</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowModal(false)}}>
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
        <Form.Control required type="text" placeholder="First Name" />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your first name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control required type="text" placeholder="Last Name" />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your last name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="Email" />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your email
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control required type="text" placeholder="123-456-7890" />
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your phone number
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="submissionLevel">
        <Form.Label>Email</Form.Label>
        <Form.Control required as="select">
          <option>20 Day | $25.00</option>
          <option>10 Day | $50.00</option>
          <option>5 Day | $80.00</option>
          <option>Bulk</option>
        </Form.Control>
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please choose a submission level
        </Form.Control.Feedback>
      </Form.Group>

      {/* <Form.List name="cards">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space key={field.key} className="space" align="start">
                  <div className="cardDetailWrap">
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      fieldKey={[field.fieldKey, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber min={1} placeholder={"Quantity"} />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "player_name"]}
                      fieldKey={[field.fieldKey, "player_name"]}
                      rules={[
                        { required: true, message: "Missing player name" },
                      ]}
                    >
                      <Input placeholder="Player Name" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "year"]}
                      fieldKey={[field.fieldKey, "year"]}
                      rules={[{ required: true, message: "Missing card year" }]}
                    >
                      <DatePicker picker="year" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "brand"]}
                      fieldKey={[field.fieldKey, "brand"]}
                      rules={[
                        { required: true, message: "Missing card brand" },
                      ]}
                    >
                      <Input placeholder="Brand" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "product"]}
                      fieldKey={[field.fieldKey, "product"]}
                      rules={[
                        { required: true, message: "Missing card product" },
                      ]}
                    >
                      <Input placeholder="Product" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "card_number"]}
                      fieldKey={[field.fieldKey, "card_number"]}
                      rules={[
                        { required: true, message: "Missing card number" },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "200px" }}
                        min={0}
                        placeholder="Card #"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "estimated_value"]}
                      fieldKey={[field.fieldKey, "estimated_value"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing estimated card value",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="1000"
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          value ? value.replace(/\$\s?|(,*)/g, "") : ""
                        }
                      />
                    </Form.Item>

                    <MinusCircleOutlined
                      className="removeBtn"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                </Space>
              ))}

              <div className="contentWrap">
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    className="addBtn"
                    style={{ width: "820px" }}
                    block
                  >
                    Add Card
                  </Button>
                </Form.Item>
              </div>
            </div>
          );
        }}
      </Form.List> */}
      <Form.Check
        required
        type="checkbox"
        label={`I agree to the ${<Button onClick={() => {setShowModal(true)}}>Terms</Button>}`}
      />
      <Button type="submit">Submit</Button>
    </Form>
    </>
  );
};
