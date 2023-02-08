import {
  Typography,
  Card,
  message,
  Popconfirm,
  Button,
  Modal,
  Input,
  Tooltip,
  Row,
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  updateQuestion,
} from "../../store/questionReducer/question.action";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getblogData } from "../../store/BlogReducer/Blog.action";

const { Text, Paragraph } = Typography;
const MyQuestionCard = ({ data }) => {
  const [blog, setblog] = useState({});
  const [loading, setloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setquestions] = useState(data.question);
  const [ellipsis, setEllipsis] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    setloading(true);
    try {
      let res = await getblogData(data.blogId);

      setblog(res.data.data);
      // handleUser(res.data.data.userId);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(updateQuestion(data._id, question));
    confirmEdit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirmEdit = (e) => {
    message.success("Question Updated");
  };

  const confirmDelete = (e) => {
    dispatch(deleteQuestion(data._id));
    message.success("question Deleted");
  };

  const cancelDelete = (e) => {
    message.error("ok will not delete the question");
  };
  const handleChange = (e) => {
    setquestions(e.target.value);
  };
  return (
    <Card
      title={blog.isDeleted ? "Blog deleted" : blog.title}
      style={{ width: 300 }}
      extra={
        !blog.isDeleted && (
          <Link to={`/blog/${data.blogId}`}>
            <LinkOutlined />
          </Link>
        )
      }
    >
      <Text>Question : {data.question}</Text>
      <Paragraph
        style={{ color: data.answer ? "black" : "gray" }}
        ellipsis={ellipsis ? { rows: 4 } : false}
      >
        <b>Answer :</b>
        {data.answer ? data.answer : "Answer not provided"}
      </Paragraph>
      <Row align="space-between" justify="middle">
        <Tooltip title="Edit Question" color="gray">
          <Button
            type="link"
            onClick={showModal}
            style={{ fontSize: "20px", color: "#666666" }}
          >
            <EditOutlined />
          </Button>
        </Tooltip>
        <Modal
          title="Edit your Question"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input value={question} onChange={handleChange} />
        </Modal>
        <Popconfirm
          title="Delete the blog"
          description="Are you sure to delete this question?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete Question" color="gray">
            <Text style={{ fontSize: "20px", color: "#666666" }}>
              <DeleteOutlined />
            </Text>
          </Tooltip>
        </Popconfirm>
      </Row>
    </Card>
  );
};

export default MyQuestionCard;
