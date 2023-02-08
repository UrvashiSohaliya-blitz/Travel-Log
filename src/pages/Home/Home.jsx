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
import QuestionCard from "../../componants/QuestionCard/QuestionCard";
import {
  getQuestionbyUser,
  getQuestionToMe,
} from "../../store/questionReducer/question.action";
import MyQuestionCard from "../../componants/QuestionCard/MyQuestion";
import { getAllblog } from "../../store/BlogReducer/Blog.action";
import {
  setCurruntPage,
  setSortBlogs,
} from "../../store/BlogReducer/Blog.actionType";
const { Text, Title } = Typography;
const Home = () => {
  const [displayQuestion, setquestions] = useState(false);
  const [myQuestion, setMyQuesion] = useState(false);
  const { allQuestions, myQuestions } = useSelector((store) => store.question);
  const {
    AllBlogs,
    userBlogs,
    blogLoading,
    blogError,
    curruntPage,
    TotalPages,
    SortBlogs,
  } = useSelector((store) => store.blogs);
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
  }, [curruntPage, SortBlogs]);

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
          !displayQuestion &&
          !myQuestion &&
          AllBlogs.map((ele) => {
            return <BlogCard key={ele._id} data={ele} />;
          })}
        {displayQuestion &&
          myQuestions &&
          myQuestions.map((e) => <MyQuestionCard data={e} />)}
        {myQuestion &&
          allQuestions &&
          allQuestions.map((e) => <QuestionCard data={e} />)}
      </Row>

      {!displayQuestion && !myQuestion && (
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
