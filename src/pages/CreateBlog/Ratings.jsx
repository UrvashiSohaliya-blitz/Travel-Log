import React, { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
const Ratings = ({ index, setindex }) => {
  const star = new Array(5).fill(0);

  return (
    <div>
      {star &&
        star.map((e, i) => {
          if (index <= i) {
            return (
              <StarOutlined
                key={i}
                style={{ fontSize: "24px", color: "#08c" }}
                onClick={() => {
                  setindex(i + 1);
                }}
              />
            );
          } else {
            return (
              <StarFilled
                key={i}
                style={{ fontSize: "24px", color: "#08c" }}
                onClick={() => {
                  setindex(i + 1);
                }}
              />
            );
          }
        })}
    </div>
  );
};

export const DefaultRating = ({ index }) => {
  const star = new Array(5).fill(0);

  return (
    <div>
      {star &&
        star.map((e, i) => {
          if (index <= i) {
            return (
              <StarOutlined
                key={i}
                style={{ fontSize: "20px", color: "#08c" }}
              />
            );
          } else {
            return (
              <StarFilled key={i} style={{ fontSize: "20px", color: "#08c" }} />
            );
          }
        })}
    </div>
  );
};

export default Ratings;
