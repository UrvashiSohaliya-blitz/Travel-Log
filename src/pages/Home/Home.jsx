import React, { useEffect, useState } from "react";
import BlogCard from "../../componants/BlogCard/BlogCard";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";

import {
  Row,
  Pagination,
  Dropdown,
  Divider,
  Typography,
  Space,
  Carousel,
  Image,
} from "antd";

import { useDispatch, useSelector } from "react-redux";

import { getAllblog, trash } from "../../store/BlogReducer/Blog.action";
import {
  setCurruntPage,
  setSortBlogs,
} from "../../store/BlogReducer/Blog.actionType";
const { Text } = Typography;
const Home = () => {
  const { AllBlogs, curruntPage, TotalPages, SortBlogs } = useSelector(
    (store) => store.blogs
  );
  const { userId, username } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const items = [
    {
      label: (
        <Text
          onClick={() => {
            dispatch({ type: setSortBlogs, payload: -1 });
          }}
        >
          Recent
        </Text>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Text
          onClick={() => {
            dispatch({ type: setSortBlogs, payload: 1 });
          }}
        >
          Oldest
        </Text>
      ),
      key: "1",
    },
  ];

  useEffect(() => {
    dispatch(getAllblog(curruntPage - 1, 6, SortBlogs));
    dispatch(trash());
    console.log(username);
  }, [curruntPage, SortBlogs, userId]);

  const onChange = (page) => {
    dispatch({ type: setCurruntPage, payload: page });
  };

  const images_Src = [
    "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/05/best-travel-planning-apps-with-maps-featured.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
    "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/09/best-travel-journal-trip-diary-apps-featured.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
  ];
  return (
    <>
      <Carousel
        autoplay
        style={{
          width: "100%",
          height: "450px",
          margin: "auto",
          padding: "2%",
          overflow: "hidden",
        }}
      >
        {images_Src &&
          images_Src.map((e, i) => (
            <img
              src={e}
              key={i}
              width="100%"
              height="440px"
              style={{ objectFit: "cover" }}

              //fallback="https://picsum.photos/700/400.jpg"
            />
          ))}
      </Carousel>
      <Row>
        <Divider orientation="right" plain>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space style={{ cursor: "pointer" }}>
              <Text type="secondary">Sort by</Text>
              <Text strong>
                {SortBlogs === -1 ? "Recent" : "Old"} <DownOutlined />
              </Text>
            </Space>
          </Dropdown>
        </Divider>
      </Row>

      <Row justify="space-around" gutter={[16, 24]} style={{ padding: "1%" }}>
        {AllBlogs &&
          AllBlogs.map((ele) => {
            return <BlogCard key={ele._id} data={ele} />;
          })}
      </Row>

      {AllBlogs.length > 0 && (
        <Pagination
          current={curruntPage}
          onChange={onChange}
          total={TotalPages * 10}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
    </>
  );
};

export default Home;
