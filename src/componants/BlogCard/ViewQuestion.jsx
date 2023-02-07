import React, { useState } from "react";
import { Button, Modal, Typography, Tooltip } from "antd";
import { CommentOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const ViewQuestion = ({ questions, getQuestions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const showModal = () => {
    getQuestions();
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
      <Tooltip title="View Discussion" color="gray">
        <Button
          type="link"
          onClick={showModal}
          style={{ fontSize: "24px", color: "#666666" }}
        >
          <CommentOutlined />
        </Button>
      </Tooltip>
      <Modal
        title="Discussion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Ok
          </Button>,
        ]}
      >
        {questions &&
          questions.map((e) => {
            return (
              <div
                key={e._id}
                style={{ marginTop: "2%", borderBottom: "1px solid lightgray" }}
              >
                <Title level={5}>{e.question}</Title>
                <Paragraph
                  ellipsis={
                    ellipsis
                      ? { rows: 2, expandable: true, symbol: "more" }
                      : false
                  }
                  style={{ color: e.answer ? "black" : "gray" }}
                >
                  {e.answer ? e.answer : "Answer not provided"}
                </Paragraph>
              </div>
            );
          })}
      </Modal>
    </>
  );
};

export default ViewQuestion;
