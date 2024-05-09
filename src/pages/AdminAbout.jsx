import React from "react";
import "../CSS/AdminAbout.css";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/rootslice";
import axios from "axios";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  //const abouts = portfolioData ? portfolioData.abouts : null;
  // console.log(portfolioData?.abouts);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://mernportfolio-backend.onrender.com/portfolio/update-about",
        {
          ...values,
          _id: portfolioData.abouts._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.abouts,
          skills: portfolioData.abouts.skills.join(", "),
        }}
      >
        <FormItem name="lottieUrl" label="LottieUrl">
          <input placeholder="LottieUrl" />
        </FormItem>
        <FormItem name="description1" label="Description1">
          <textarea placeholder="Description1" />
        </FormItem>
        <FormItem name="description" label="Description2">
          <textarea placeholder="Description2" />
        </FormItem>
        <FormItem name="skills" label="Skills">
          <textarea placeholder="Skills" />
        </FormItem>
        <div className="d-flex justify-content-end">
          <button className="py-1  text-white" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAbout;
