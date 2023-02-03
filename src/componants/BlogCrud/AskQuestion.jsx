import React, { useState } from "react";
import { Collapse, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { askQuestion } from "../../store/questionReducer/question.action";
import { useDispatch, useSelector } from "react-redux";
const { Panel } = Collapse;
const { Search } = Input;
export const AskQuestion = ({ blog, userId }) => {
  const { questionLoading, data, questionError } = useSelector(
    (store) => store.question
  );

  const dispatch = useDispatch();
  const [val, setval] = useState("");
  const onSearch = () => {
    dispatch(
      askQuestion({
        question: val,
        blogId: blog._id,
        userId: userId,
        blogUser: blog.userId,
      })
    );
    setval("");
  };

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header={"Ask Question"} key="1">
        <Search
          placeholder="Question"
          value={val}
          enterButton={<PlusOutlined />}
          onChange={(e) => {
            setval(e.target.value);
          }}
          onSearch={onSearch}
        />
      </Panel>
    </Collapse>
  );
};
