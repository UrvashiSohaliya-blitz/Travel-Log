import {
  Typography,
  Card,
  message,
  Popconfirm,
  Button,
  Modal,
  Input,
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getblogData } from "../../controller/getblog";
import { getUser } from "../../controller/getUser";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  updateQuestion,
} from "../../store/questionReducer/question.action";
const { Text } = Typography;
const MyQuestionCard = ({ data }) => {
  const [loading, setloading] = useState(true);
  const [blog, setblog] = useState({});
  const [user, setuser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setquestions] = useState(data.question);
  const dispatch = useDispatch();
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(updateQuestion(data._id, question));

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
      title={blog.title}
      style={{ width: 300 }}
      extra={
        <Link to={`/blog/${data.blogId}`}>
          <LinkOutlined />
        </Link>
      }
    >
      <Text>Question : {data.question}</Text>
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Button type="link" onClick={showModal}>
          Edit
        </Button>
        <Modal
          title="Basic Modal"
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
          <a href="#">Delete</a>
        </Popconfirm>
      </div>
    </Card>
  );
};

export default MyQuestionCard;
