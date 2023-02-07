import React, { useEffect, useState } from "react";
import { Badge, Card, Spin, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../controller/getUser";
import { DefaultRating } from "../CreateBlog/Ratings";
import "./Blog.css";
import CarouselPlay from "../../componants/corousol.js/ Carousel";
import { getblogData } from "../../store/BlogReducer/Blog.action";
const { Text, Paragraph } = Typography;

const Blog = () => {
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({});
  const [user, setuser] = useState("");
  const placesToVisit = data.placesToVisit?.join(" | ");
  const heritages = data.heritages?.join(" | ");
  const time = data.createdAt?.split("T");
  useEffect(() => {
    handleGetData();
  }, []);
  const handleUser = async (id) => {
    try {
      let res = await getUser(id);

      setuser(res.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetData = async () => {
    setloading(true);
    try {
      let res = await getblogData(id);

      setdata(res.data.data);
      handleUser(res.data.data.userId);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="example">
        <Spin size="large" />
      </div>
    );
  }
  console.log(data);

  return (
    <Card bordered={false} style={{ padding: "0 2% 0 2%" }}>
      <Text style={{ color: "#f2a53f", fontSize: "30px", marginRight: "2%" }}>
        {data.title}
      </Text>

      <Badge
        count={data.location ? data.location : "unknown place"}
        color="rgb(45, 183, 245)"
      />
      <Badge count={data.tags && data.tags[0]} />
      <div>
        <div>
          <Text>
            <a> {user ? user : "Someone"} </a> shared their experience {time}
          </Text>
        </div>
      </div>
      <div>
        <CarouselPlay images={data.images} />
      </div>
      <Text strong type="secondary">
        Journey Date : {data.journyDate?.startDate} To{" "}
        {data.journyDate?.endDate}
      </Text>
      <div>
        <div className="flexBox">
          <Text strong>TravelRate :</Text>
          <DefaultRating index={data.travelRate} />
        </div>
        <div className="flexBox">
          <Text strong>Safety Rate :</Text>
          <DefaultRating index={data.saftyRate} />
        </div>
        <div className="flexBox">
          <Text strong>Places To Visit : </Text>
          <Text> {placesToVisit}</Text>
        </div>
        <div className="flexBox">
          <Text strong>Heritages : </Text>
          <Text> {heritages}</Text>
        </div>
        <div className="flexBox">
          <Text strong>Cost : </Text>
          <Text> Rs.{data.travelCost}</Text>
        </div>

        <Paragraph style={{ color: "#676767", fontSize: "20px" }}>
          {data.description}
        </Paragraph>
      </div>
    </Card>
  );
};

export default Blog;
