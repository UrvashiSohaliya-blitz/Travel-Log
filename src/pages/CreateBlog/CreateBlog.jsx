import React, { useState } from "react";
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
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { postBlog } from "../../store/BlogReducer/Blog.action";
import dayjs from "dayjs";
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
  const [dateDisabled, setdateDisabled] = useState([false, false]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogLoading, blogError } = useSelector((store) => store.blogs);
  let BlogData = {
    userId: localStorage.getItem("user"),
    title: "",
    description: "",
    tags: "nature/beach/trek/religious/tropical/... etc",
    images: images,
    heritages: Heritages,
    placesToVisit: places,
    travelRate: travelRate,
    safetyRate: saftyRate,
    travelCost: "",
    journeyDate: {
      start: "",
      end: "",
    },
    allowQuestions: false,
  };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const Error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async ({ blog }) => {
    let { journyDate } = blog;
    BlogData = { ...BlogData, ...blog };
    BlogData.journeyDate = {};
    BlogData.journeyDate.startDate = journyDate[0]?.$d;
    BlogData.journeyDate.endDate = journyDate[1]?.$d;

    let c = await dispatch(postBlog(BlogData));
    if (c) {
      success("Blog posted successfully");
      onReset();
    } else {
      Error("Something went wrong");
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf("day");
  };

  return (
    <div>
      <Title style={{ position: "absolute", top: "10%" }} level={4}>
        <Link to="/">
          <ArrowLeftOutlined />
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
          label="Journey Date"
          name={["blog", "journyDate"]}
          rules={[{ required: true }]}
        >
          <RangePicker
            format={["DD/MM/YYYY", "DD/MM/YY"]}
            disabledDate={disabledDate}
          />
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
        <Form.Item label="Questions" name={["blog", "allowQuestions"]}>
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
          loading={blogLoading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlog;
