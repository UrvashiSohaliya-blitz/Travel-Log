import { Typography, Button, Tooltip, Card, Space, Row } from "antd";
import React, { useState, useEffect } from "react";
import { getUser } from "../../controller/getUser";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  LeftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../store/AuthReducer/AuthAction";
import { resetBlogs } from "../../store/BlogReducer/Blog.actionType";

const { Title, Text } = Typography;
const UserDetail = () => {
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, username } = useSelector((store) => store.auth);
  // const user = localStorage.getItem("user");
  const handleLogout = () => {
    dispatch({ type: Logout });
    dispatch({ type: resetBlogs });
    navigate("/");
  };

  useEffect(() => {
    handleUser();
  }, []);
  const handleUser = async () => {
    try {
      let res = await getUser(userId);
      setdata(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row align="middle" justify="space-between">
      <Title style={{ position: "absolute", top: "10%" }} level={4}>
        <Link to="/">
          <ArrowLeftOutlined />
        </Link>
      </Title>
      <div></div>
      <Space>
        <Text strong style={{ textTransform: "capitalize", fontSize: "17px" }}>
          {data.name}
        </Text>
        <br />
        <Text>{data.email}</Text>
        <br />
        <Text>Age: {data.age}</Text>
        <br />
        <Tooltip title="Logout" color="blue">
          <Button
            onClick={handleLogout}
            type="text"
            style={{ marginLeft: "-20px" }}
          >
            <LogoutOutlined /> Logout
          </Button>
        </Tooltip>
      </Space>
    </Row>
  );
};

export default UserDetail;
