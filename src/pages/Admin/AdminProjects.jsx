import { Form, Modal,message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';
import "../../CSS/AdminExperience.css";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading, ReloadData } from "../../redux/rootslice";
import axios from 'axios';

const AdminProjects = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setshowAddEditModal] = useState(false);
    const [selectedItemforEdit, setselectedItemforEdit] = useState(null);
    const [type, settype] = useState("add");
  
    const onFinish = async (values) => {
      try {
        const temptechnologies = values?.technologies.split(',') || [];
        values.technologies=temptechnologies;
        dispatch(ShowLoading());
        let response;
        if (selectedItemforEdit) {
          response = await axios.post(
            "http://localhost:5000/api/portfolio/update-project",
            {
              ...values,
              _id: selectedItemforEdit._id,
            }
          );
        } else {
          response = await axios.post(
            "http://localhost:5000/api/portfolio/add-project",
            values
          );
        }
  
        dispatch(HideLoading());
        if (response.data.success) {
          message.success(response.data.message);
          setshowAddEditModal(false);
          setselectedItemforEdit(null);
          dispatch(HideLoading());
          dispatch(ReloadData(true));
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };
    const onDelete = async (item) => {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          "http://localhost:5000/api/portfolio/delete-project",
          {
            _id: item._id,
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          message.success(response.data.message);
          dispatch(HideLoading());
          dispatch(ReloadData(true));
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };
    return (
      <div className="">
        <div className="d-flex justify-content-end">
          <button
            className="addproject bg-secondary px-3 py-1 text-white"
            onClick={() => {
              setselectedItemforEdit(null);
              setshowAddEditModal(true);
              settype("add")
            }}
          >
            Add Project
          </button>
        </div>
        <div className="row gap-3 mt-3">
          {projects.map((project) => (
            <div className="col-md-4 Shadow border border-2 p-2 d-flex flex-column gap-3">
              <h5 className="text-success-subtle text-center fw-bold">
                {project.title}
              </h5>
              <hr />
              <img src={project.image} alt='' className='h-50 w-55'/>
              <h6 className="text-black">Title: {project.title}</h6>
              <h6 className="text-black">
                description: {project.description}
              </h6>
              <div className="d-flex justify-content-end gap-2 mt-5 ">
                <button
                  className="btn1 text-black px-2 py-1 rounded"
                  onClick={() => {
                    setselectedItemforEdit(project);
                    setshowAddEditModal(true);
                    settype("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn2 text-white px-2 py-1 rounded"
                  onClick={() => {
                    onDelete(project);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {(type === "add" || selectedItemforEdit) && (
          <Modal
            open={showAddEditModal}
            title={selectedItemforEdit ? "Edit Project" : "Add Project"}
            footer={null}
            onCancel={() => setshowAddEditModal(false)}
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{...selectedItemforEdit, technologies:selectedItemforEdit?.technologies.join(", ") }|| {}}
            >
              <FormItem name="title" label="Title">
                <input placeholder="Title" />
              </FormItem>

              <FormItem name="image" label="Image Url">
                <input placeholder="Image" />
              </FormItem>
                  
              <FormItem name="description" label="Description">
                <textarea placeholder="Description" />
              </FormItem>
  
              <FormItem name="technologies" label="Technologies">
                <input placeholder="Technologies"/>
              </FormItem> 

              <FormItem name="link" label="DemoLink">
                <input placeholder="DemoLink"/>
              </FormItem>

              <div className="d-flex justify-content-end">
                <button
                  className="border-success text-success bg-white px-3 py-2"
                  onClick={() => {
                    setshowAddEditModal(false);
                  }}
                >
                  Cancel
                </button>
                <button className="bg-secondary text-white px-3 py-2 ">
                  {selectedItemforEdit ? "Update" : "add"}
                </button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    );
}

export default AdminProjects