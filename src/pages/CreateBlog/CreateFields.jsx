import React from "react";
import { Badge, Input, Row } from "antd";
const { Search } = Input;
const CreateFields = ({ items, setItems, color = "#faad14" }) => {
  const handleAdd = (e) => {
    setItems([...items, e]);
  };

  return (
    <div>
      <Row>
        {items &&
          items.map((ele) => {
            return <FildItems ele={ele} color={color} />;
          })}
      </Row>
      <Search
        enterButton="Add"
        onSearch={handleAdd}
        style={{ marginTop: "2%" }}
      />
    </div>
  );
};

function FildItems({ ele, color }) {
  return (
    <div>
      <Badge count={ele} color={color} />
    </div>
  );
}

export default CreateFields;
