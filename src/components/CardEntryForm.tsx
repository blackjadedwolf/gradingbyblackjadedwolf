import { Form, Input, DatePicker, Button, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import React from "react";
import { Card } from "../models";

const CardEntryForm = () => {
  const onFinish = (values: Store) => {
    values.cards.forEach((card: Card) => {
      console.log(card)
    })
  };

  return (
    <Form name="dynamic_card_entry_form" onFinish={onFinish} autoComplete="off">
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
                    name={[field.name, "player_name"]}
                    fieldKey={[field.fieldKey, "player_name"]}
                    rules={[{ required: true, message: "Missing player name" }]}
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
                    rules={[{ required: true, message: "Missing card brand" }]}
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
                    rules={[{ required: true, message: "Missing card number" }]}
                  >
                    <InputNumber placeholder="Card #" />
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
                      parser={(value) => value ? value.replace(/\$\s?|(,*)/g, "") : ""}
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
  );
};

export default CardEntryForm;