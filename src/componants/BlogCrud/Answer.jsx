import React, { useState } from "react";
import { Button, Modal, Typography, Input, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../store/questionReducer/question.action";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title } = Typography;
const Answer = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [val, setval] = useState(data.answer ? data.answer : "");
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(addAnswer(data._id, val));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    setval(e.target.value);
  };
  return (
    <>
      <Button type="link" onClick={showModal}>
        {data.answer ? (
          <Tooltip title="Edit Answer" color="gray">
            <EditOutlined style={{ fontSize: "24px", color: "#666666" }} />
          </Tooltip>
        ) : (
          "Give Answer"
        )}
      </Button>
      <Modal
        title={data.question}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Title level={5}>Answer</Title>
        <TextArea onChange={handleChange} value={val} />
      </Modal>
    </>
  );
};

export default Answer;
