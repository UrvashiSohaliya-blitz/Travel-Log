import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button } from "antd";
import UserDetail from "../userDetail/UserDetail";

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
        {user && <Link to="/create">Create</Link>}
        {user && <UserDetail id={user} />}
        {user && <Button onClick={handleLogout}>Logout</Button>}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
      </Space>
    </Space>
  );
};

export default Navbar;
