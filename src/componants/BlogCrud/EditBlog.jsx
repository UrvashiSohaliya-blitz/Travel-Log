import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { updateBlog } from "../../controller/updateBlog";
const { Paragraph } = Typography;
export const EditBlog = ({ data, handleGetBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, settitle] = useState(data.title);
  const [description, setdescription] = useState(data.description);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let res = await updateBlog(data._id, {
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
      <Button type="link" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title={"Editing your blog"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Paragraph editable={{ onChange: settitle }}>{title}</Paragraph>
        <Paragraph editable={{ onChange: setdescription }}>
          {description}
        </Paragraph>
      </Modal>
    </div>
  );
};

export default EditBlog;
