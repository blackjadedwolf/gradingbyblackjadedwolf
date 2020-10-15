import {
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Space,
  Menu,
  Select,
  Checkbox,
  Modal,
} from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { Card, User } from "../models";
import { Invoice } from "./";

const DropdownMenu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <Menu.Item>3rd menu item</Menu.Item>
  </Menu>
);

const CardEntryForm = () => {
  const [cards, setCards] = useState<Card[]>();
  const [userDetails, setUserDetails] = useState<User>();
  const { Option } = Select;

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

  const showAgreement = () => {
    Modal.info({
      title: "User Submission Agreement",
      content: <div>Lorem Ipsum don't sue us if you're dumb</div>,
      onOk() {},
    });
  };

  return !(cards && userDetails) ? (
    <Form
      name="dynamic_card_entry_form"
      onFinish={onFinish}
      autoComplete="off"
      style={formStyle}
    >
      <div className="d-flex flex-row align-items-center justify-content-center mt-5">
        <Form.Item
          name="first_name"
          style={{ width: "400px", marginRight: "20px" }}
          required
        >
          <Input placeholder={"First Name"} />
        </Form.Item>

        <Form.Item
          name="last_name"
          style={{ width: "400px", float: "left" }}
          required
        >
          <Input placeholder={"Last Name"} />
        </Form.Item>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center">
        <Form.Item name="email" style={{ width: "820px" }} required>
          <Input placeholder={"Email"} />
        </Form.Item>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center">
        <Form.Item
          name="phone_number"
          style={{ width: "450px", marginRight: "20px" }}
          required
        >
          <Input placeholder={"Phone Number"} />
        </Form.Item>

        <Form.Item name="submission_level" required>
          <Select
            showSearch
            style={{ width: "350px" }}
            placeholder="Select a Submission Level"
            optionFilterProp="children"
          >
            <Option value="1"> 20 Day | $25.00 </Option>
            <Option value="2"> 10 Day | $50.00 </Option>
            <Option value="3"> 5 Day | $80.00 </Option>
            <Option value="4"> Bulk </Option>
          </Select>
        </Form.Item>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div
          style={{
            border: "1px solid #E8E8EE",
            width: "820px",
            marginBottom: "20px",
          }}
        ></div>
      </div>

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
                  <div
                    className="d-flex flex-row justify-content-between"
                    style={{ width: "1300px" }}
                  >
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
                      style={{ marginTop: "8px" }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                </Space>
              ))}

              <div className="d-flex flex-row align-items-center justify-content-center">
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "820px", border: "1px solid F7F7EE" }}
                    block
                  >
                    Add Card
                  </Button>
                </Form.Item>
              </div>
            </div>
          );
        }}
      </Form.List>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
      >
        <Checkbox>
          I have read the{" "}
          <Button type="primary" onClick={showAgreement}>
            agreement
          </Button>
        </Checkbox>
      </Form.Item>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  ) : (
    <Invoice cards={cards} userDetails={userDetails} />
  );
};

let formStyle = {
  width: "1300px",
};

export default CardEntryForm;
