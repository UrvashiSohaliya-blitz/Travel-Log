import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button, Tooltip } from "antd";
import UserDetail from "../userDetail/UserDetail";
import { UserOutlined, FormOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../store/AuthReducer/AuthAction";
const Navbar = () => {
  const navigate = useNavigate();
  const { userId, username } = useSelector((store) => store.auth);

  return (
    <Space
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        padding: "5px",
      }}
    >
      <Link to="/">
        <h1>TravelBlog</h1>
      </Link>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: "24px",
          color: "#108ee9",
        }}
      >
        {userId && (
          <Tooltip title="Create Blog" color="blue">
            <Link to="/create">
              <FormOutlined />
            </Link>
          </Tooltip>
        )}
        {userId && (
          <Tooltip title="Profile" color="blue">
            <Button
              type="ghost"
              style={{
                fontSize: "24px",
                color: "#108ee9",
                textTransform: "capitalize",
              }}
            >
              <Link to="/user">
                <UserOutlined />
                {username}
              </Link>
            </Button>
          </Tooltip>
        )}

        {!userId && <Link to="/login">Login</Link>}
        {!userId && <Link to="/signup">Signup</Link>}
      </Space>
    </Space>
  );
};

export default Navbar;
