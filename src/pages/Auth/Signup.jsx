import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSelection from "antd/es/table/hooks/useSelection";
import { signupUser } from "../../store/AuthReducer/Auth.action";
import { AuthLoadig } from "../../store/AuthReducer/AuthAction";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [successSignup, setsuccessSignup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authError, userId, username, authLoading } = useSelector(
    (store) => store.auth
  );

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
      setsuccessSignup(true);
      handleTimeOut();
    }
  }, [userId]);
  const onFinish = async ({ user }) => {
    dispatch(signupUser(user));
  };

  const handleTimeOut = () => {
    setTimeout(() => {
      navigate("/");
    }, [5000]);
  };
  if (authError) {
    Error("Something went wrong");
  }
  console.log(authError, userId, username, authLoading);
  if (successSignup) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "5%",
          textTransform: "capitalize",
        }}
      >
        <Typography.Title>WelCome {username}!</Typography.Title>
        <Typography.Text>Thank you For Creating an account</Typography.Text>
      </div>
    );
  }
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
