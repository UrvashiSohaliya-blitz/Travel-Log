import React, { useEffect, useState } from "react";
import { deleteBlog } from "../../controller/deleteBlog";
import BlogCard from "../../componants/BlogCard/BlogCard";
import { Row, Pagination, Tabs } from "antd";

import { getblog } from "../../controller/getblog";
import { handleFilter } from "../../controller/handleFilter";
const Home = () => {
  const [Blogs, setBlogs] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [filtered, setfiltered] = useState([]);
  const [sortbyTime, setsortbyTime] = useState(-1);
  const [user, setuser] = useState("");
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
    } else if (key === "2") {
      setsortbyTime(-1);
    } else if (key === "1") {
      setuser(localStorage.getItem("user"));
    } else if (key === "0") {
      setuser(null);
    }
    // let data = handleFilter(items[+key], Blogs);
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
      </Row>

      <Pagination
        current={current}
        onChange={onChange}
        total={totalPages * 10}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </>
  );
};

export default Home;
