import React, { useState } from "react";
import { Input, Tooltip, Button, Modal, notification } from "antd";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { askQuestion } from "../../store/questionReducer/question.action";
import { useDispatch, useSelector } from "react-redux";
const Context = React.createContext({ name: "Default" });
const { Search } = Input;
export const AskQuestion = ({ blog, userId, handleGetBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [val, setval] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const { questionLoading, data, questionError } = useSelector(
    (store) => store.question
  );
  const dispatch = useDispatch();

  const openNotification = (placement) => {
    api.info({
      message: ` ${placement}`,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
      openNotification("Question Added");
      setIsModalOpen(false);
    }
    if (questionError) {
      openNotification("Something Went wrong");
    }
    setval("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Ask Question" color="gray">
        <Button
          type="link"
          onClick={showModal}
          style={{ fontSize: "24px", color: "#666666" }}
        >
          <QuestionCircleOutlined />
        </Button>
      </Tooltip>
      <Modal
        title={"Ask Question"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: val.length===0 }}
      >
        <Input
          placeholder="Question"
          value={val}
          onChange={(e) => {
            setval(e.target.value);
          }}
          loading={questionLoading}
          error={questionError}
        />
      </Modal>
    </>
  );
};
