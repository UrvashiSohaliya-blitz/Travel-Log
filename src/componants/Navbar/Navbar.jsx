import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button, Tooltip } from "antd";
import UserDetail from "../userDetail/UserDetail";
import { LogoutOutlined, FormOutlined } from "@ant-design/icons";
const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
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
      <Space>
        {user && (
          <Tooltip title="Create Blog" color="blue">
            <Link to="/create">
              <FormOutlined />
            </Link>
          </Tooltip>
        )}
        {user && <UserDetail id={user} />}
        {user && (
          <Tooltip title="Logout" color="blue">
            <Button onClick={handleLogout} type="ghost">
              <LogoutOutlined />
            </Button>
          </Tooltip>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
      </Space>
    </Space>
  );
};

export default Navbar;
