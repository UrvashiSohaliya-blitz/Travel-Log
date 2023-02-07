import React, { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "../../componants/QuestionCard/QuestionCard";
import {
  getQuestionbyUser,
  getQuestionToMe,
} from "../../store/questionReducer/question.action";
import MyQuestionCard from "../../componants/QuestionCard/MyQuestion";
import {
  deleteBlog,
  getAllblog,
  getUserBlogs,
} from "../../store/BlogReducer/Blog.action";
import {
  setCurruntPage,
  setCurruntUserPage,
  setSortBlogs,
} from "../../store/BlogReducer/Blog.actionType";
import UserDetail from "../../componants/userDetail/UserDetail";
const { Text, Title } = Typography;
const User = () => {
  const [key, setkey] = useState(1);

  const [user, setuser] = useState("");
  const { allQuestions, myQuestions } = useSelector((store) => store.question);
  const { userId } = useSelector((store) => store.auth);

  const { userBlogs, SortBlogs, currUserPage, TotalPages } = useSelector(
    (store) => store.blogs
  );
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
    dispatch(getUserBlogs(currUserPage - 1, 6, SortBlogs, userId));
    dispatch(getQuestionbyUser(userId));
    dispatch(getQuestionToMe(userId));
  }, [currUserPage, SortBlogs]);

  const onChange = (page) => {
    dispatch({ type: setCurruntUserPage, payload: page });
  };

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id));
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
    if (e == 2) {
      dispatch(getQuestionbyUser(userId));
    } else if (e == 3) {
      dispatch(getQuestionToMe(userId));
    } else if (e == 1) {
      dispatch(getUserBlogs(currUserPage - 1, 6, SortBlogs, userId));
    }
  };

  return (
    <>
      <UserDetail />
      <Tabs defaultActiveKey="0" items={sortingItems} onChange={onChangeTab} />
      {key == 1 && (
        <>
          {userBlogs.length > 0 && (
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
          )}
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
                  />
                );
              })}
            {userBlogs.length === 0 && (
              <Title type="secondary" level={4}>
                You have not posted any blogs
              </Title>
            )}
          </Row>
          {userBlogs.length > 0 && (
            <Pagination
              current={currUserPage}
              onChange={onChange}
              total={TotalPages}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          )}
        </>
      )}
      <Row justify="space-around" gutter={[16, 24]} style={{ padding: "1%" }}>
        {key == 2 &&
          myQuestions &&
          myQuestions.map((e) => <MyQuestionCard data={e} />)}
        {key == 2 && myQuestions.length === 0 && (
          <Title type="secondary" level={4}>
            You have not Asked any Question
          </Title>
        )}
        {key == 3 && allQuestions.length === 0 && (
          <Title type="secondary" level={4}>
            No Questions
          </Title>
        )}
        {key == 3 &&
          allQuestions &&
          allQuestions.map((e) => <QuestionCard data={e} />)}
      </Row>
    </>
  );
};

export default User;
