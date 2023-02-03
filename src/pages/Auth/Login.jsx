import React from "react";
import { Button, Form, Input, InputNumber, Typography, message } from "antd";
import { loginUser } from "../../controller/auth";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
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

  const onFinish = async ({ user }) => {
    try {
      let res = await loginUser(user);
      localStorage.setItem("user", res.data.data._id);
      success(res.data.message);

      navigate("/");
    } catch (error) {
      Error(error.response?.data?.message);
    }
  };

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

export default Signup;
