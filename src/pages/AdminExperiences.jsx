import useSelection from "antd/es/table/hooks/useSelection";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/AdminExperience.css";
import { Form, Input, Modal, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { HideLoading, ShowLoading, ReloadData } from "../redux/rootslice";
import axios from "axios";

const AdminExperiences = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setshowAddEditModal] = useState(false);
  const [selectedItemforEdit, setselectedItemforEdit] = useState(null);
  const [type, settype] = useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemforEdit) {
        response = await axios.post(
          "https://mernportfolio-backend.onrender.com/portfolio/update-experience",
          {
            ...values,
            _id: selectedItemforEdit._id,
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-experience",
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
        "http://localhost:5000/api/portfolio/delete-experience",
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
          className="addexperience bg-secondary px-3 py-1 text-white"
          onClick={() => {
            setselectedItemforEdit(null);
            setshowAddEditModal(true);
            settype("add")
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="row gap-2 mt-4">
        {experiences.map((experience) => (
          <div className="col-md-4 Shadow border border-2 p-3 d-flex flex-column ">
            <h6 className="text-success-subtle fs-xl fw-bold">
              {experience.period}
            </h6>
            <hr />
            <h6 className="text-black">Company: {experience.company}</h6>
            <h6 className="text-black">Role: {experience.title}</h6>
            <h6 className="text-black">
              description: {experience.description}
            </h6>
            <div className="d-flex justify-content-end gap-2 mt-5 ">
              <button
                className="btn1 text-black px-2 py-1 rounded"
                onClick={() => {
                  setselectedItemforEdit(experience);
                  setshowAddEditModal(true);
                  settype("edit");
                }}
              >
                Edit
              </button>
              <button
                className="btn2 text-white px-2 py-1 rounded"
                onClick={() => {
                  onDelete(experience);
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
          title={selectedItemforEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => setshowAddEditModal(false)}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemforEdit || {}}
          >
            <FormItem name="period" label="Period">
              <input placeholder="Period" />
            </FormItem>
            <FormItem name="company" label="Company">
              <input placeholder="company" />
            </FormItem>

            <FormItem name="title" label="Role">
              <input placeholder="Role" />
            </FormItem>

            <FormItem name="description" label="Description">
              <input placeholder="Description" />
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
};

export default AdminExperiences;
