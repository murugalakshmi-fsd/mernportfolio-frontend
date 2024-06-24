import { Form, Input, Modal, message, Button, Spin } from "antd";
import React, { useState, useEffect } from 'react';
import "../CSS/AdminExperience.css";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading, setReloadData, fetchPortfolioData } from "../redux/rootslice";
import axiosInstance from '../axiosConfig';

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portfolioData, reloadData } = useSelector((state) => state.root);
  const { portfolio } = portfolioData || {};
  const projects = portfolio?.projects || [];

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
      const tempTechnologies = values?.technologies.split(',') || [];
      values.technologies = tempTechnologies;
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axiosInstance.post(
          `/portfolio/update-project/${selectedItemForEdit._id}`,
          values
        );
      } else {
        response = await axiosInstance.post(
          "/portfolio/add-project",
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
        console.log("response.data.message",response.data.message)
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("error",error.message)
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.delete(
        `/portfolio/delete-project/${item._id}`
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const openAddEditModal = (project = null) => {
    setSelectedItemForEdit(project);
    setShowAddEditModal(true);
    if (project) {
      form.setFieldsValue({
        ...project,
        technologies: project.technologies.join(", ")
      });
    } else {
      form.resetFields();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button
          className="addproject bg-secondary px-3 py-1 text-white"
          onClick={() => openAddEditModal()}
        >
          Add Project
        </Button>
      </div>
      <div className="row gap-2 mt-4">
        {projects.map((project) => (
          <div className="col-md-4 Shadow border border-2 p-2 d-flex flex-column gap-3" key={project._id}>
            <h5 className="text-success-subtle text-center fw-bold">
              {project.title}
            </h5>
            <hr />
            <img src={project.image} alt='' className='h-50 w-55'/>
            <h6 className="text-black">Title: {project.title}</h6>
            <h6 className="text-black">
              Description: {project.description}
            </h6>
            <div className="d-flex justify-content-end gap-2 mt-5">
              <Button
                className="btn1 text-black px-2 py-1 rounded"
                onClick={() => openAddEditModal(project)}
              >
                Edit
              </Button>
              <Button
                className="btn2 text-white px-2 py-1 rounded"
                onClick={() => onDelete(project)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...selectedItemForEdit, technologies: selectedItemForEdit?.technologies.join(", ") } || {}}
        >
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="image" label="Image Url">
            <Input placeholder="Image" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <Input placeholder="Technologies" />
          </Form.Item>
          <Form.Item name="link" label="DemoLink">
            <Input placeholder="DemoLink" />
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

export default AdminProjects;
