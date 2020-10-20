import {
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Space,
  Select,
  Checkbox,
  Modal,
} from "antd";

import { MinusCircleOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import React, { useEffect, useState } from "react";
import { Card, User } from "../models";
import { Invoice } from "./";
import { getTestMessage } from "../services/api";
import '../styles/CardEntryForm.css';

const CardEntryForm = () => {
  const [cards, setCards] = useState<Card[]>();
  const [userDetails, setUserDetails] = useState<User>();
  const { Option } = Select;

  useEffect(() => {
    getTestMessage()
  }, [])

  const onFinish = (values: Store) => {
    let tempDetails: User = {
      email: values.email,
      firstName: values.first_name,
      lastName: values.last_name,
      phoneNumber: values.phone_number,
    };
    setUserDetails(tempDetails);

    let tempCards: Card[] = [];

    values.cards.forEach((card: any) => {
      let tempCard: Card = {...card}
      tempCard.year = Number(card.year._d.toString().slice(11, 15));;
      tempCards.push(tempCard);
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

    <Form name="dynamic_card_entry_form" onFinish={onFinish} autoComplete="off" className="form">

      <div className="contentWrap">
        <Form.Item name="first_name" className="firstName" required >
          <Input placeholder={"First Name"} />
        </Form.Item>

        <Form.Item name="last_name" className="lastName" required >
          <Input placeholder={"Last Name"} />
        </Form.Item>
      </div>

      <div className="contentWrap">
        <Form.Item name="email" className="email" required>
          <Input placeholder={"Email"} />
        </Form.Item>
      </div>

      <div className="contentWrap">
        <Form.Item name="phone_number" className="phoneNumber" required >
          <Input placeholder={"Phone Number"} />
        </Form.Item>

        <Form.Item name="submission_level" required>
          <Select showSearch  className="select" placeholder="Select a Submission Level" optionFilterProp="children" >
            <Option value="1"> 20 Day | $25.00 </Option>
            <Option value="2"> 10 Day | $50.00 </Option>
            <Option value="3"> 5 Day | $80.00 </Option>
            <Option value="4"> Bulk </Option>
          </Select>
        </Form.Item>
      </div>

      <div className="contentWrap">
        <div className='divider'></div>
      </div>

      <Form.List name="cards">
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

                    <MinusCircleOutlined className="removeBtn" onClick={() => { remove(field.name);}}/>
                    
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
          I have read and agree to the following <Button onClick={showAgreement}>terms</Button>
        </Checkbox>
      </Form.Item>
      <div className="contentWrap">
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


export default CardEntryForm;
