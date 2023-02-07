import React, { useState } from "react";
import moment from "moment";
import { postBlog } from "../../controller/postblog";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
  Typography,
  Switch,
  Tooltip,
} from "antd";
import CreateFields from "./CreateFields";
import Ratings from "./Ratings";
import { useNavigate, Link } from "react-router-dom";
import Upload from "./Upload";
import { LeftOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography;
const CreateBlog = () => {
  const [places, setplaces] = useState([]);
  const [Heritages, SetHeritages] = useState([]);
  const [travelRate, setTravelRate] = useState(-1);
  const [saftyRate, setSaftyRate] = useState(-1);
  const [messageApi, contextHolder] = message.useMessage();

  const [images, setImages] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let BlogData = {
    userId: localStorage.getItem("user"),
    title: "",
    description: "",
    tags: "nature/beach/trek/religious/tropical/... etc",
    images: images,
    heritages: Heritages,
    placesToVisit: places,
    travelRate: travelRate,
    saftyRate: saftyRate,
    travelCost: "",
    journyDate: {
      start: "",
      end: "",
    },
    allowQustions: false,
  };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const Error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const onFinish = async ({ blog }) => {
    let { journyDate } = blog;
    BlogData = { ...BlogData, ...blog };
    BlogData.journyDate = {};
    BlogData.journyDate.startDate = journyDate[0]?.$d;
    BlogData.journyDate.endDate = journyDate[1]?.$d;
    const onReset = () => {
      form.resetFields();
    };
    try {
      const res = await postBlog(BlogData);
      onReset();
      success(res.data.message);

      navigate("/");
    } catch (error) {
      Error(error.response.data.message);
    }
  };

  function disableDateRanges(date) {
    console.log(date);
  }

  return (
    <div>
      <Title style={{ position: "absolute", top: "15%" }}>
        <Link to="/">
          <LeftOutlined />
        </Link>
      </Title>

      {contextHolder}
      <Typography.Title style={{ textAlign: "center" }}>
        Create Blog
      </Typography.Title>

      <Form
        form={form}
        name="nest-messages"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, margin: "auto" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name={["blog", "title"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Location"
          name={["blog", "location"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tags"
          name={["blog", "tags"]}
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="nature">nature</Select.Option>
            <Select.Option value="beach">beach</Select.Option>
            <Select.Option value="trek">trek</Select.Option>
            <Select.Option value="religious">religious</Select.Option>
            <Select.Option value="tropical">tropical</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Journy Date"
          name={["blog", "journyDate"]}
          rules={[{ required: true }]}
        >
          <RangePicker onChange={disableDateRanges} disabled={[false, false]} />
        </Form.Item>

        <Form.Item
          label="TravelCost"
          name={["blog", "travelCost"]}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Description"
          name={["blog", "description"]}
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Questions" name={["blog", "allowQustions"]}>
          <Switch />
        </Form.Item>

        <Form.Item label="Images" valuePropName="fileList">
          <Upload images={images} setImages={setImages} />
        </Form.Item>
        <Form.Item label="Places To Visit" valuePropName="fileList">
          <CreateFields items={places} setItems={setplaces} />
        </Form.Item>
        <Form.Item label="Heritages" valuePropName="fileList">
          <CreateFields
            items={Heritages}
            setItems={SetHeritages}
            color="pink"
          />
        </Form.Item>
        <Form.Item label="Traveling" valuePropName="fileList">
          <Ratings index={travelRate} setindex={setTravelRate} />
        </Form.Item>
        <Form.Item label="Safety" valuePropName="fileList">
          <Ratings index={saftyRate} setindex={setSaftyRate} />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "30%",
            marginLeft: "33%",
          }}
          size="large"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlog;
