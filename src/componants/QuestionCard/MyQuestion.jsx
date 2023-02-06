import { Typography, Card } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getblogData } from "../../controller/getblog";
import { getUser } from "../../controller/getUser";
import { Link } from "react-router-dom";
const { Text } = Typography;
const MyQuestionCard = ({ data }) => {
  const [loading, setloading] = useState(true);
  const [blog, setblog] = useState({});
  const [user, setuser] = useState("");

  useEffect(() => {
    handleGetData();
  }, []);
  const handleUser = async (id) => {
    try {
      let res = await getUser(id);

      setuser(res.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetData = async () => {
    setloading(true);
    try {
      let res = await getblogData(data.blogId);

      setblog(res.data.data);
      handleUser(res.data.data.userId);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  console.log(data);
  return (
    <Card
      title={blog.title}
      style={{ width: 300 }}
      extra={
        <Link to={`/blog/${data.blogId}`}>
          <LinkOutlined />
        </Link>
      }
    >
      <Text>Question : {data.question}</Text>
    </Card>
  );
};

export default MyQuestionCard;
