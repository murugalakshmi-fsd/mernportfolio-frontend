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

const AdminExperiences = () => {
  const dispatch = useDispatch();
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root
  );
  const { portfolio } = portfolioData || {};
  const experiences = portfolio?.experiences || [];

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
          `/portfolio/update-experience/${selectedItemForEdit._id}`,
          values
        );
      } else {
        response = await axiosInstance.post(
          "/portfolio/add-experience",
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
        `/portfolio/delete-experience/${item._id}`
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

  const openAddEditModal = (experience = null) => {
    setSelectedItemForEdit(experience);
    setShowAddEditModal(true);
    if (experience) {
      form.setFieldsValue(experience);
    } else {
      form.resetFields();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button
          className="addexperience bg-secondary px-3 py-1 text-white"
          onClick={() => openAddEditModal()}
        >
          Add Experience
        </Button>
      </div>
      <div className="row gap-2 mt-4">
        {experiences.map((experience) => (
          <div
            className="col-md-4 Shadow border border-2 p-3 d-flex flex-column"
            key={experience._id}
          >
            <h6 className="text-success-subtle fs-xl fw-bold">
              {experience.period}
            </h6>
            <hr />
            <h6 className="text-black">Company: {experience.company}</h6>
            <h6 className="text-black">Role: {experience.title}</h6>
            <h6 className="text-black">
              Description: {experience.description}
            </h6>
            <div className="d-flex justify-content-end gap-2 mt-5">
              <Button
                className="btn1 text-black px-2 py-1 rounded"
                onClick={() => openAddEditModal(experience)}
              >
                Edit
              </Button>
              <Button
                className="btn2 text-white px-2 py-1 rounded"
                onClick={() => onDelete(experience)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedItemForEdit || {}}
        >
          <Form.Item name="period" label="Period">
            <Input placeholder="Period" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item name="title" label="Role">
            <Input placeholder="Role" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Description" />
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

export default AdminExperiences;
