import { Form, Input, DatePicker, Button, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { Card, User } from "../models";
import { Invoice } from "./";

const CardEntryForm = () => {
  const [cards, setCards] = useState<Card[]>();
  const [userDetails, setUserDetails] = useState<User>();
  const onFinish = (values: Store) => {
    let tempDetails: User = {
      email: values.email,
      firstName: values.first_name,
      lastName: values.last_name,
      phoneNumber: values.phone_number,
    };
    setUserDetails(tempDetails);

    let tempCards: Card[] = [];

    values.cards.forEach((card: Card) => {
      tempCards.push(card);
    });

    setCards(tempCards);
  };

  return (
    <>
      {!(cards && userDetails) ? (
        <Form
          name="dynamic_card_entry_form"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="first_name" label="First Name" required>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name" required>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email:" required>
            <Input />
          </Form.Item>
          <Form.Item name="phone_number" label="Phone Number" required>
            <Input />
          </Form.Item>
          <Form.List name="cards">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "quantity"]}
                        fieldKey={[field.fieldKey, "quantity"]}
                        rules={[
                          { required: true, message: "Missing quantity" },
                        ]}
                      >
                        <InputNumber min={1} placeholder={"QTY"} />
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
                        rules={[
                          { required: true, message: "Missing card year" },
                        ]}
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
                        <InputNumber min={0} placeholder="Card #" />
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
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined />
                      Add Card
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Invoice cards={cards} userDetails={userDetails} />
      )}
    </>
  );
};

export default CardEntryForm;
