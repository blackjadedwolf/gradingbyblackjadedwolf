import { Button, Form, Input, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import React from "react";
import { register } from "services/api";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const onFinish = (values: Store) => {
    register(values.email, values.password).catch((error) => {
      alert(error);
    });
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="you@domain.com"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Space direction="vertical">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Link to="/passwordreset">
          <Button>Reset Password</Button>
        </Link>
        <Link to="/login">
          <Button>Back to Login</Button>
        </Link>
      </Space>
    </Form>
  );
};

export default RegisterPage;
