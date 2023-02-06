import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button, Tooltip } from "antd";
import UserDetail from "../userDetail/UserDetail";
import { FormOutlined } from "@ant-design/icons";
const Navbar = () => {
  const user = localStorage.getItem("user");

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
              <FormOutlined fontSize="26px" />
            </Link>
          </Tooltip>
        )}
        {user && <UserDetail id={user} />}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
      </Space>
    </Space>
  );
};

export default Navbar;
