import React, { useEffect } from "react";
import "../CSS/AdminAbout.css";
import { Form, Input, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading, setPortfolioData, fetchPortfolioData } from "../redux/rootslice";
import axiosInstance from "../axiosConfig";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData, loading } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    if (portfolioData?.portfolio?.about) {
      const { lottieUrl, description1, skills } = portfolioData.portfolio.about;
      
      form.setFieldsValue({
        lottieUrl: lottieUrl || "",
        description1: description1 || "",
        skills: skills ? skills.join(", ") : "",
      });
    } else {
      form.resetFields();
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",").map((skill) => skill.trim());
      dispatch(showLoading());

      const response = await axiosInstance.post("/portfolio/update-about", {
        ...values,
        skills: tempSkills,
        _id: portfolioData?.portfolio?.about?._id, // Optional chaining to handle undefined _id
      });

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setPortfolioData({
          ...portfolioData,
          portfolio: {
            ...portfolioData.portfolio,
            about: { ...values, skills: tempSkills }
          }
        }));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={(errorInfo) => {
          console.log('Failed:', errorInfo);
          message.error('Please fill out all required fields.');
        }}
      >
        <Form.Item name="lottieUrl" label="Image URL">
          <Input placeholder="e.g., https://lottie.host/123.json" />
        </Form.Item>
        <Form.Item
          name="description1"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea placeholder="Description about yourself" rows={4} />
        </Form.Item>
        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: "Please enter skills" }]}
        >
          <Input.TextArea placeholder="e.g., JavaScript, React" rows={4} />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="py-1 text-white" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAbout;
