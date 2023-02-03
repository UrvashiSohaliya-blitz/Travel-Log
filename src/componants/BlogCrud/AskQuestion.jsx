import React, { useState } from "react";
import { Collapse, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { askQuestion, getQuestionbyUser } from "../../controller/question";
import { useDispatch, useSelector } from "react-redux";
const { Panel } = Collapse;
const { Search } = Input;
export const AskQuestion = ({ blogId, userId }) => {
  const { data } = useSelector((store) => store.question);
  const dispatch = useDispatch();
  const [val, setval] = useState("");
  const onSearch = (e) => {
    handleQuestion({ question: val, blogId: blogId, userId: userId });
    setval("");
  };
  const handleAllQuestions = async () => {
    try {
      let data = await getQuestionbyUser(userId);
      console.log(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleQuestion = async (data) => {
    try {
      let res = await askQuestion(data);

      handleAllQuestions();
    } catch (error) {
      console.log(error);
    }
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
