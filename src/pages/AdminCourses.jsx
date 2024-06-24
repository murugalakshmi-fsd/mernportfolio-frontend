import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Modal, message, Button, Spin } from "antd";
import {
  hideLoading,
  showLoading,
  setReloadData,
  fetchPortfolioData,
} from "../redux/rootslice";
import axiosInstance from "../axiosConfig";
import "../CSS/AdminExperience.css";

const AdminCourses= () => {
  const dispatch = useDispatch();
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root
  );
  const { portfolio } = portfolioData || {};
  const courses = portfolio?.courses || [];

  useEffect(() => {
    if (!portfolioData || reloadData) {
      dispatch(fetchPortfolioData());
      dispatch(setReloadData(false)); // Reset reloadData flag
    }
  }, [portfolioData, reloadData, dispatch]);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      let response;
      if (selectedItemForEdit) {
        response = await axiosInstance.post(
          `/portfolio/update-course/${selectedItemForEdit._id}`,
          values
        );
      } else {
        response = await axiosInstance.post(
          "/portfolio/add-course",
          values
        );
      }
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(setReloadData(true)); // Trigger reload after successful update
        form.resetFields(); // Reset form fields after submission
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error submitting form: ", error);
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.delete(
        `/portfolio/delete-course/${item._id}`
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setReloadData(true)); // Trigger reload after successful deletion
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const openAddEditModal = (course = null) => {
    setSelectedItemForEdit(course);
    setShowAddEditModal(true);
    if (course) {
      form.setFieldsValue(course);
    } else {
      form.resetFields();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button
          className="addcourse bg-secondary px-3 py-1 text-white"
          onClick={() => openAddEditModal()}
        >
          Add course
        </Button>
      </div>
      <div className="row gap-2 mt-4">
        {courses.map((course) => (
           <div className="col-md-4 Shadow border border-2 p-2 d-flex flex-column gap-2">
           <h5 className="text-success-subtle text-center fw-bold">
             {course.title}
           </h5>
           <hr />
           <img src={course.image} alt='' className='h-50 w-53'/>
           <p className="text-black">
             description: {course.description}
           </p>
            <div className="d-flex justify-content-end gap-2 mt-5">
              <Button
                className="btn1 text-black px-2 py-1 rounded"
                onClick={() => openAddEditModal(course)}
              >
                Edit
              </Button>
              <Button
                className="btn2 text-white px-2 py-1 rounded"
                onClick={() => onDelete(course)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedItemForEdit || {}}
        >
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item name="image" label="ImageUrl">
            <Input placeholder="ImageUrl" />
          </Form.Item>
          <Form.Item name="link" label="DemoLink">
            <Input placeholder="Demolink" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button
              className="border-success text-success bg-white px-3 py-2"
              onClick={() => setShowAddEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-secondary text-white px-3 py-2"
              type="primary"
              htmlType="submit"
            >
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCourses;
