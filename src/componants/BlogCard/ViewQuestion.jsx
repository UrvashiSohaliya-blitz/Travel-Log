import React, { useState } from "react";
import { Button, Modal, Typography, Card } from "antd";

const { Text, Title, Paragraph } = Typography;
const ViewQuestion = ({ questions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
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
      <Button type="ghost" onClick={showModal}>
        View Questions
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {questions &&
          questions.map((e) => {
            return (
              <div
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
                  {e.answer ? e.answer : "Ans Not Given"}
                </Paragraph>
              </div>
            );
          })}
      </Modal>
    </>
  );
};

export default ViewQuestion;
