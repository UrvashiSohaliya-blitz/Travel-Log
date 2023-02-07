import React, { useEffect, useState } from "react";
import { deleteBlog } from "../../controller/deleteBlog";
import BlogCard from "../../componants/BlogCard/BlogCard";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";

import { Row, Pagination, Dropdown, Divider, Typography, Space } from "antd";
import { getblog } from "../../controller/getblog";
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
  const [Blogs, setBlogs] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [filtered, setfiltered] = useState([]);
  const [sortbyTime, setsortbyTime] = useState(-1);
  const [user, setuser] = useState("");
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
  const userId = localStorage.getItem("user");

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
    handleGetBlogs();
    dispatch(getAllblog(curruntPage - 1, 6, SortBlogs));
  }, [curruntPage, SortBlogs, user]);

  const onChange = (page) => {
    dispatch({ type: setCurruntPage, payload: page });
  };
  // const onChangeTab = (key) => {
  //   if (key === "3") {
  //     setsortbyTime(1);
  //     setquestions(false);
  //     setMyQuesion(false);
  //   } else if (key === "2") {
  //     setsortbyTime(-1);
  //     setquestions(false);
  //     setMyQuesion(false);
  //   } else if (key === "1") {
  //     setuser(localStorage.getItem("user"));
  //     setquestions(false);
  //     setMyQuesion(false);
  //   } else if (key === "0") {
  //     setuser(null);
  //     setquestions(false);
  //     setMyQuesion(false);
  //   } else if (key === "4") {
  //     dispatch(getQuestionbyUser(userId));
  //     setquestions(true);
  //     setMyQuesion(false);
  //   } else if (key === "5") {
  //     dispatch(getQuestionToMe(userId));
  //     setMyQuesion(true);
  //     setquestions(false);
  //   }
  // };

  const handleGetBlogs = async () => {
    try {
      let res = await getblog(current - 1, 6, sortbyTime, user);

      settotalPages(res.data.TotalPages);
      setBlogs(res.data.data);
      setfiltered(res.data.data);
      console.log("blog");
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      let res = await deleteBlog(id);
      handleGetBlogs();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
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
            return (
              <BlogCard
                key={ele._id}
                data={ele}
                handleDelete={handleDelete}
                handleGetBlogs={handleGetBlogs}
              />
            );
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
          total={totalPages * 10}
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
