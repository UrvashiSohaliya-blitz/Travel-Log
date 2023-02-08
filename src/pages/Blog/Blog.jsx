import React, { useEffect, useState } from "react";
import { Badge, Card, Row, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import { getUser } from "../../controller/getUser";
import { DefaultRating } from "../CreateBlog/Ratings";
import "./Blog.css";
import CarouselPlay from "../../componants/corousol.js/ Carousel";
import { getblogData } from "../../store/BlogReducer/Blog.action";
const { Text, Paragraph, Title } = Typography;

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

  return (
    <Card
      bordered={false}
      style={{ padding: "0 2% 0 2%", backgroundColor: "transparent" }}
    >
      <Row align="space-between" justify="middle">
        <Title style={{ color: "Black", fontSize: "30px", marginRight: "2%" }}>
          {data.title}
        </Title>
        <Row>
          <Badge
            count={data.location ? data.location : "unknown place"}
            color="rgb(45, 183, 245)"
          />
          <Badge count={data.tags && data.tags[0]} />
        </Row>
      </Row>
      <div>
        <div>
          <Text>
            <Text strong> {user ? user : "Someone"} </Text> shared their
            experience {time}
          </Text>
        </div>
      </div>
      <div>
        <CarouselPlay images={data.images} />
      </div>
      <Text strong type="secondary">
        Journey Date : {data.journeyDate?.startDate} To{" "}
        {data.journeyDate?.endDate}
      </Text>
      <div>
        {data.travelRate > 0 && (
          <div className="flexBox">
            <Text strong>TravelRate :</Text>
            <DefaultRating index={data.travelRate} />
          </div>
        )}
        {data.safetyRate > 0 && (
          <div className="flexBox">
            <Text strong>Safety Rate :</Text>
            <DefaultRating index={data.safetyRate} />
          </div>
        )}
        {placesToVisit && (
          <div className="flexBox">
            <Text strong>Places To Visit : </Text>
            <Text> {placesToVisit}</Text>
          </div>
        )}
        {heritages && (
          <div className="flexBox">
            <Text strong>Heritages : </Text>
            <Text> {heritages}</Text>
          </div>
        )}
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
