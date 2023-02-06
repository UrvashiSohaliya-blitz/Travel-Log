import {
  Typography,
  Card,
  message,
  Popconfirm,
  Button,
  Modal,
  Input,
  Tooltip,
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getblogData } from "../../controller/getblog";
// import { getUser } from "../../controller/getUser";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  updateQuestion,
} from "../../store/questionReducer/question.action";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const MyQuestionCard = ({ data }) => {
  const [loading, setloading] = useState(true);
  const [blog, setblog] = useState({});
  // const [user, setuser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setquestions] = useState(data.question);
  const [ellipsis, setEllipsis] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    handleGetData();
  }, []);
  // const handleUser = async (id) => {
  //   try {
  //     let res = await getUser(id);

  //     setuser(res.data.data.name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      title={blog.title}
      style={{ width: 300 }}
      extra={
        <Link to={`/blog/${data.blogId}`}>
          <LinkOutlined />
        </Link>
      }
    >
      <Text>Question : {data.question}</Text>
      <Paragraph ellipsis={ellipsis ? { rows: 4 } : false}>
        <b>Answer :</b>
        {data.answer}
      </Paragraph>
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Tooltip title="Edit Question" color="blue">
          <Button type="link" onClick={showModal}>
            <EditTwoTone />
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
          <a href="#">
            <Tooltip title="Delete Question" color="blue">
              <DeleteTwoTone />
            </Tooltip>
          </a>
        </Popconfirm>
      </div>
    </Card>
  );
};

export default MyQuestionCard;
