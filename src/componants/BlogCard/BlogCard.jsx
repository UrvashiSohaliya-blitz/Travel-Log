import React, { useEffect, useState } from "react";
import { Card, Typography, message, Image, Popconfirm, Badge } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "../../controller/getUser";
import EditBlog from "../BlogCrud/EditBlog";
import { AskQuestion } from "../BlogCrud/AskQuestion";

const { Text, Paragraph } = Typography;
const BlogCard = ({ data, handleDelete, handleGetBlogs }) => {
  const userId = localStorage.getItem("user");
  const [ellipsis, setEllipsis] = useState(true);
  const places = data.placesToVisit.join(" | ");
  const [user, setuser] = useState("");
  const time = data.createdAt?.split("T");
  const startDate = data.journyDate.startDate.split("T");

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = async () => {
    try {
      let res = await getUser(data.userId);
      setuser(res.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = (e) => {
    handleDelete(data._id);
    message.success("Blog Deleted");
  };

  const cancel = (e) => {
    message.error("ok will not delete blog");
  };

  return (
    <Card bordered={false} style={{ width: 400, backgroundColor: "#f4f8fa" }}>
      <div style={{ display: "flex", justifyContent: "end", padding: "2%" }}>
        <Badge count={data.tags[0]} />
        <Badge
          count={data.location ? data.location : "unknown place"}
          color="rgb(45, 183, 245)"
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: "3%" }}
      >
        <div>
          <div>
            <Text>
              {time ? time[0] : ""}{" "}
              <a style={{ textTransform: "capitalize", fontSize: "18px" }}>
                {user ? user : "someone"}{" "}
              </a>
              published a blog
            </Text>
          </div>
          <Link to={`/blog/${data._id}`}>{data.title}</Link>
          <br />
        </div>
        <Image
          src={data.images[0]}
          fallback="https://picsum.photos/700/400.jpg"
          style={{ width: "150px", height: "120px" }}
        />
      </div>

      <div>
        <Text strong type="secondary">
          {startDate[0]}
        </Text>
        <br />
        <Paragraph ellipsis={ellipsis ? { rows: 4 } : false}>
          {data.description}
        </Paragraph>
      </div>
      {userId === data.userId && (
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Popconfirm
            title="Delete the blog"
            description="Are you sure to delete this blog?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
          <EditBlog data={data} handleGetBlogs={handleGetBlogs} />
        </div>
      )}
      {userId !== data.userId && data.allowQustions && (
        <AskQuestion blog={data} userId={userId} />
      )}
    </Card>
  );
};

export default BlogCard;