import { Typography, Card } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getUser } from "../../controller/getUser";
import { Link } from "react-router-dom";
import Answer from "../BlogCrud/Answer";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { getblogData } from "../../store/BlogReducer/Blog.action";
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

      handleUser(data.userId);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <Card
      title={blog.isDeleted ? "Blog Deleted" : blog.title}
      style={{ width: 300 }}
      extra={
        !blog.isDeleted && (
          <Link to={`/blog/${data.blogId}`}>
            <LinkOutlined />
          </Link>
        )
      }
    >
      <div>
        <Title level={5}>{data.question}</Title>
        <Text
          style={{
            fontSize: "11px",
            color: "gray",
            textTransform: "capitalize",
          }}
        >
          {" "}
          (asked by <strong>{user}</strong>)
        </Text>
      </div>

      {data.answer?.length > 0 ? (
        <>
          <b>Answered </b>
          <Paragraph ellipsis={ellipsis ? { rows: 4 } : false}>
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
