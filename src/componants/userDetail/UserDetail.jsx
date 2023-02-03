import { Popover, Button } from "antd";
import React, { useState, useEffect } from "react";
import { getUser } from "../../controller/getUser";

const UserDetail = ({ id }) => {
  const [data, setdata] = useState({});

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
        trigger="click"
      >
        <Button type="dashed" style={{ textTransform: "capitalize" }}>
          {data.name}
        </Button>
      </Popover>
    </div>
  );
};

export default UserDetail;
