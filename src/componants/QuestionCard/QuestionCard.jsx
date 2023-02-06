import { Typography, Card, Button, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getblogData } from "../../controller/getblog";
import { getUser } from "../../controller/getUser";
import { Link } from "react-router-dom";

import Answer from "../BlogCrud/Answer";
import Paragraph from "antd/es/typography/Paragraph";
const { Text } = Typography;
const QuestionCard = ({ data }) => {
  const [loading, setloading] = useState(true);
  const [blog, setblog] = useState({});
  const [user, setuser] = useState("");
  const [ellipsis, setEllipsis] = useState(true);
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
      <div>
        <Text>
          <b>Question : </b>
          {data.question}
        </Text>
      </div>
      {data.answer?.length > 0 ? (
        <>
          <Paragraph ellipsis={ellipsis ? { rows: 4 } : false}>
            <b>Answer :</b>
            {data.answer}
          </Paragraph>
          <Answer data={data} />
        </>
      ) : (
        <Answer data={data} />
      )}

      {}
    </Card>
  );
};

export default QuestionCard;
