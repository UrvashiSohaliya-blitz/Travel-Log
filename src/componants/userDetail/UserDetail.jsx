import { Popover, Button } from "antd";
import React, { useState, useEffect } from "react";
import { getUser } from "../../controller/getUser";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const UserDetail = ({ id }) => {
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("user");
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
