import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  message,
  Image,
  Popconfirm,
  Badge,
  Tooltip,
  Button,
  Row,
  Divider,
} from "antd";
import { Link } from "react-router-dom";
import { getUser } from "../../controller/getUser";
import EditBlog from "../BlogCrud/EditBlog";
import { AskQuestion } from "../BlogCrud/AskQuestion";
import { DeleteOutlined } from "@ant-design/icons";
import { getQuestionByBlog } from "../../store/questionReducer/question.action";
import ViewQuestion from "./ViewQuestion";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../store/BlogReducer/Blog.action";

const { Text, Title, Paragraph } = Typography;
const BlogCard = ({ data }) => {
  const { userId } = useSelector((store) => store.auth);
  const { blogLoading, blogError } = useSelector((store) => store.blogs);
  const [ellipsis, setEllipsis] = useState(true);
  const [questions, setquestions] = useState([]);
  const [user, setuser] = useState("");
  const time = data.createdAt?.split("T");
  const startDate = data.journeyDate?.startDate.split("T");
  const dispatch = useDispatch();
  useEffect(() => {
    handleUser();
    getQuestions();
  }, []);

  const handleUser = async () => {
    try {
      let res = await getUser(data.userId);
      setuser(res.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  const getQuestions = async () => {
    try {
      let res = await getQuestionByBlog(data._id);
      setquestions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const confirm = async (e) => {
    let res = await dispatch(deleteBlog(data._id));
    if (res) {
      message.success("Blog Deleted");
    } else {
      message.error("something went wrong");
    }
  };

  const cancel = (e) => {
    message.error("ok will not delete blog");
  };

  return (
    <Card
      bordered={false}
      style={{
        width: 400,

        backgroundColor: "#f4f8fa",
        height: "auto",
      }}
    >
      {/* <div
        style={{ display: "flex", justifyContent: "space-between", gap: "3%" }}
      > */}
      <div>
        <Row
          align="space-between"
          justify="center"
          style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "2px" }}
        >
          <Text type="secondary" fontSize="16px">
            <Link
              style={{
                textTransform: "capitalize",

                color: "black",
                fontWeight: "bold",
              }}
              to="#"
            >
              {user ? user : "someone"}{" "}
            </Link>
            published a blog
          </Text>
          <Text> {time ? time[0] : ""} </Text>
        </Row>

        <Title level={4}>
          <Link to={`/blog/${data._id}`} style={{ color: "black" }}>
            {data.title}
          </Link>
        </Title>
        <br />
      </div>
      {data.images.length > 0 && (
        <Image
          src={data.images[0]}
          ///fallback="https://picsum.photos/700/400.jpg"
          style={{
            width: 350,
            height: "200px",
            maxheight: "200px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "end", padding: "2%" }}>
        <Badge count={data.tags[0]} />
        <Badge
          count={data.location ? data.location : "unknown place"}
          color="rgb(45, 183, 245)"
        />
      </div>
      <div>
        <Text type="secondary">{startDate && startDate[0]}</Text>
        <br />
        <Paragraph ellipsis={ellipsis ? { rows: 4 } : false}>
          {data.description}
        </Paragraph>
      </div>
      <Row align="space-between" justify="center">
        {userId === data.userId && <EditBlog data={data} />}
        {userId === data.userId && (
          <Popconfirm
            title="Delete the blog"
            description="Are you sure to delete this blog?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            okButtonProps={{ loading: blogLoading }}
            cancelText="No"
          >
            <Tooltip title="Delete Blog" color="gray">
              <Text style={{ fontSize: "24px", color: "#666666" }}>
                <DeleteOutlined />
              </Text>
            </Tooltip>
          </Popconfirm>
        )}

        {questions.length > 0 && (
          <ViewQuestion questions={questions} getQuestions={getQuestions} />
        )}
        {userId !== data.userId && data.allowQuestions && (
          <AskQuestion
            blog={data}
            userId={userId}
            getQuestions={getQuestions}
          />
        )}
      </Row>
    </Card>
  );
};

export default BlogCard;
