import React, { useState } from "react";
import { Button, Modal, Typography, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../store/BlogReducer/Blog.action";

const { Paragraph, Title } = Typography;
export const EditBlog = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, settitle] = useState(data.title);
  const [description, setdescription] = useState(data.description);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    dispatch(
      updateBlog(data._id, {
        title: title,
        description: description,
      })
    );

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit Blog" color="gray">
        <Button
          type="link"
          onClick={showModal}
          style={{ fontSize: "24px", color: "#666666" }}
        >
          <EditOutlined />
        </Button>
      </Tooltip>

      <Modal
        title={"Editing your blog"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Title level={4} editable={{ onChange: settitle }}>
          {title}
        </Title>
        <Paragraph editable={{ onChange: setdescription }}>
          {description}
        </Paragraph>
      </Modal>
    </div>
  );
};

export default EditBlog;
