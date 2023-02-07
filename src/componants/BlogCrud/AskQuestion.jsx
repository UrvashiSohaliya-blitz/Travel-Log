import React, { useState } from "react";
import { Input, Tooltip, Button, Modal } from "antd";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { askQuestion } from "../../store/questionReducer/question.action";
import { useDispatch, useSelector } from "react-redux";

const { Search } = Input;
export const AskQuestion = ({ blog, userId, handleGetBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { questionLoading, data, questionError } = useSelector(
    (store) => store.question
  );

  const dispatch = useDispatch();
  const [val, setval] = useState("");
  const onSearch = () => {
    dispatch(
      askQuestion({
        question: val,
        blogId: blog._id,
        userId: userId,
        blogUser: blog.userId,
        answer: "",
      })
    );
    handleGetBlogs();
    if (!questionLoading && !questionError) {
      alert("Question Added");
    }
    setval("");
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {" "}
      <Tooltip title="Ask Question" color="blue">
        <Button type="link" onClick={showModal}>
          <QuestionCircleOutlined />
        </Button>
      </Tooltip>
      <Modal
        title={"Ask Question"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Search
          placeholder="Question"
          value={val}
          enterButton={<PlusOutlined />}
          onChange={(e) => {
            setval(e.target.value);
          }}
          loading={questionLoading}
          error={questionError}
          onSearch={onSearch}
        />
      </Modal>
    </>
  );
};
