import { Button, Form, Input, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import React from "react";
import { login } from "services/api";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const onFinish = (values: Store) => {
    login(values.email, values.password).catch((error) => {
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
      <Space direction="horizontal">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log In
          </Button>
        </Form.Item>
        <Link to="/passwordreset">
          <Button>Reset Password</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </Space>
    </Form>
  );
};

export default LoginPage;
