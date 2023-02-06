import React, { useState } from "react";
import { Button, Modal, Typography, Tooltip } from "antd";
import { updateBlog } from "../../controller/updateBlog";
import { EditTwoTone } from "@ant-design/icons";

const { Paragraph, Title } = Typography;
export const EditBlog = ({ data, handleGetBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, settitle] = useState(data.title);
  const [description, setdescription] = useState(data.description);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await updateBlog(data._id, {
        title: title,
        description: description,
      });
      handleGetBlogs();
      setIsModalOpen(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit Blog" color="blue">
        <Button type="link" onClick={showModal}>
          <EditTwoTone />
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
