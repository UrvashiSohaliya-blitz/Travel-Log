import { Popover, Button, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { getUser } from "../../controller/getUser";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/AuthReducer/AuthAction";
const UserDetail = ({ id }) => {
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = localStorage.getItem("user");
  const handleLogout = () => {
    dispatch({ type: Logout });
    navigate("/");
  };

  useEffect(() => {
    handleUser();
  }, []);
  const handleUser = async () => {
    try {
      let res = await getUser(id);
      setdata(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const text = <span>UserDetail</span>;
  const content = (
    <div>
      <p>Username : {data.name}</p>
      <p>Email : {data.email}</p>
      <p>Age : {data.age}</p>
      <Tooltip title="Logout" color="blue">
        <Button onClick={handleLogout} type="text">
          <LogoutOutlined /> Logout
        </Button>
      </Tooltip>
    </div>
  );
  return (
    <div>
      <Popover
        placement="bottomLeft"
        title={text}
        content={content}
        trigger="hover"
      >
        <Button
          type="ghost"
          style={{
            fontSize: "24px",
            color: "#108ee9",
          }}
        >
          <UserOutlined />
        </Button>
      </Popover>
    </div>
  );
};

export default UserDetail;
