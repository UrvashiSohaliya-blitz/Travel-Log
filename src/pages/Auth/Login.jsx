import React, { useEffect, useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/AuthReducer/Auth.action";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [successLogin, setsuccessLogin] = useState(false);
  const dispatch = useDispatch();
  const { authError, userId, username } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const Error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  useEffect(() => {
    if (userId) {
      success();
      setsuccessLogin(true);
      handleTimeOut();
    }
  }, [userId]);
  const onFinish = async ({ user }) => {
    dispatch(loginUser(user));
  };

  const handleTimeOut = () => {
    setTimeout(() => {
      navigate("/");
    }, [5000]);
  };
  if (authError) {
    Error("Something went wrong");
  }
  if (successLogin) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "5%",
          textTransform: "capitalize",
        }}
      >
        <Typography.Title>WelCome Back {username}!</Typography.Title>
        <Typography.Text>Thank you For Login Again</Typography.Text>
      </div>
    );
  }
  return (
    <div>
      {contextHolder}
      <Typography.Title style={{ textAlign: "center" }}>Login</Typography.Title>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          margin: "auto",
          marginTop: "5%",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="input password" />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ margin: "auto" }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
