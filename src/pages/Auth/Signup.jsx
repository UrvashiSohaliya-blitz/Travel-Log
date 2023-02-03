import React from "react";
import { Button, Form, Input, InputNumber, Typography, message } from "antd";
import { signupUser } from "../../controller/auth";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
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

  /* eslint-disable no-template-curly-in-string */
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
  /* eslint-enable no-template-curly-in-string */

  const onFinish = async ({ user }) => {
    try {
      let response = await signupUser(user);
      localStorage.setItem("user", response.data.data._id);
      success(response.data.message);
      navigate("/");
    } catch (error) {
      Error(error.response.data.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <Typography.Title style={{ textAlign: "center" }}>
        Signup
      </Typography.Title>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          margin: "auto",
          marginTop: "2%",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
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

        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" style={{ margin: "auto" }}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
