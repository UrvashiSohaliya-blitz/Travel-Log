import React, { useEffect, useState } from "react";
import { deleteBlog } from "../../controller/deleteBlog";
import BlogCard from "../../componants/BlogCard/BlogCard";
import { Row, Pagination, Tabs } from "antd";
import { getblog } from "../../controller/getblog";
import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "../../componants/QuestionCard/QuestionCard";
import {
  getQuestionbyUser,
  getQuestionToMe,
} from "../../store/questionReducer/question.action";
import MyQuestionCard from "../../componants/QuestionCard/MyQuestion";
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
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user");
  const items = [
    {
      key: "0",
      label: `All Blogs`,
    },
    {
      key: "1",
      label: `My Blogs`,
    },
    {
      key: "2",
      label: `latest`,
    },
    {
      key: "3",
      label: `oldest`,
    },
    {
      key: "4",
      label: `My Questions`,
    },
    {
      key: "5",
      label: "Asked To Me",
    },
  ];

  useEffect(() => {
    handleGetBlogs();
  }, [current, sortbyTime, user]);

  const onChange = (page) => {
    setCurrent(page);
  };
  const onChangeTab = (key) => {
    if (key === "3") {
      setsortbyTime(1);
      setquestions(false);
      setMyQuesion(false);
    } else if (key === "2") {
      setsortbyTime(-1);
      setquestions(false);
      setMyQuesion(false);
    } else if (key === "1") {
      setuser(localStorage.getItem("user"));
      setquestions(false);
      setMyQuesion(false);
    } else if (key === "0") {
      setuser(null);
      setquestions(false);
      setMyQuesion(false);
    } else if (key === "4") {
      dispatch(getQuestionbyUser(userId));
      setquestions(true);
      setMyQuesion(false);
    } else if (key === "5") {
      dispatch(getQuestionToMe(userId));
      setMyQuesion(true);
      setquestions(false);
    }
  };

  const handleGetBlogs = async () => {
    try {
      let res = await getblog(current - 1, 6, sortbyTime, user);

      settotalPages(res.data.TotalPages);
      setBlogs(res.data.data);
      setfiltered(res.data.data);
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
      <Tabs defaultActiveKey="0" items={items} onChange={onChangeTab} />
      <Row justify="space-around" gutter={[16, 24]} style={{ padding: "1%" }}>
        {filtered &&
          !displayQuestion &&
          !myQuestion &&
          filtered.map((ele) => {
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
          current={current}
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
