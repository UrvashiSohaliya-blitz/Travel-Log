import React, { useEffect, useState } from "react";
import { deleteBlog } from "../../controller/deleteBlog";
import BlogCard from "../../componants/BlogCard/BlogCard";
import { DownOutlined } from "@ant-design/icons";

import {
  Row,
  Pagination,
  Dropdown,
  Divider,
  Typography,
  Space,
  Tabs,
} from "antd";
import { getblog } from "../../controller/getblog";
import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "../../componants/QuestionCard/QuestionCard";
import {
  getQuestionbyUser,
  getQuestionToMe,
} from "../../store/questionReducer/question.action";
import MyQuestionCard from "../../componants/QuestionCard/MyQuestion";
import { getAllblog, getUserBlogs } from "../../store/BlogReducer/Blog.action";
import {
  setCurruntPage,
  setCurruntUserPage,
  setSortBlogs,
} from "../../store/BlogReducer/Blog.actionType";
import UserDetail from "../../componants/userDetail/UserDetail";
const { Text } = Typography;
const User = () => {
  const [key, setkey] = useState(1);
  const [Blogs, setBlogs] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [filtered, setfiltered] = useState([]);
  const [sortbyTime, setsortbyTime] = useState(-1);
  const [user, setuser] = useState("");
  const [displayQuestion, setquestions] = useState(false);
  const [myQuestion, setMyQuesion] = useState(false);
  const { allQuestions, myQuestions } = useSelector((store) => store.question);
  const { userId } = useSelector((store) => store.auth);

  const {
    AllBlogs,
    userBlogs,
    blogLoading,
    blogError,
    curruntPage,
    TotalPages,
    SortBlogs,
    currUserPage,
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
    handleGetBlogs();
    dispatch(getUserBlogs(currUserPage - 1, 6, SortBlogs, userId));
    dispatch(getQuestionbyUser(userId));
    dispatch(getQuestionToMe(getQuestionbyUser));
  }, [currUserPage, SortBlogs, user]);

  const onChange = (page) => {
    dispatch({ type: setCurruntUserPage, payload: page });
  };

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
  const sortingItems = [
    {
      key: "1",
      label: `My Blogs`,
    },

    {
      key: "2",
      label: `My Questions`,
    },
    {
      key: "3",
      label: "Asked To Me",
    },
  ];
  const onChangeTab = (e) => {
    setkey(e);
  };

  return (
    <>
      <UserDetail />
      <Tabs defaultActiveKey="0" items={sortingItems} onChange={onChangeTab} />
      {key == 1 && (
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
          <Row
            justify="space-around"
            gutter={[16, 24]}
            style={{ padding: "1%" }}
          >
            {userBlogs &&
              userBlogs.map((ele) => {
                return (
                  <BlogCard
                    key={ele._id}
                    data={ele}
                    handleDelete={handleDelete}
                    handleGetBlogs={handleGetBlogs}
                  />
                );
              })}
          </Row>
          <Pagination
            current={currUserPage}
            onChange={onChange}
            total={totalPages}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      )}
      <Row justify="space-around" gutter={[16, 24]} style={{ padding: "1%" }}>
        {key == 2 &&
          myQuestions &&
          myQuestions.map((e) => <MyQuestionCard data={e} />)}
        {key == 3 &&
          allQuestions &&
          allQuestions.map((e) => <QuestionCard data={e} />)}
      </Row>
    </>
  );
};

export default User;
