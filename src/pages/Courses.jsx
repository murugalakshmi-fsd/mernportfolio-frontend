import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import { courses } from "../resources/courses.jsx";
import "../CSS/Course.css";
import { useSelector } from "react-redux";

const Courses = () => {
  const [selectedIndex, setselectedIndex] = useState(0);
  const {loading,portfolioData}=useSelector((state)=>state.root);
  const {courses}=portfolioData || {};
  return (
    <div className="p-4">
      <SectionTitle title="Courses" />
      <div className="container d-flex flex-column flex-sm-row py-10 gap-10">
        <div className="col-md-4 d-flex flex-md-column gap-3 border-start border-1 border-secondary flex-sm-row coursetitle">
          {courses.map((course, index) => (
            <div
              onClick={() => {
                setselectedIndex(index);
              }}
              className="title"
            >
              <h6
                className={`px-2 ${
                  selectedIndex === index
                    ? "selecttext border-start border-3 border-success-subtl py-2"
                    : "text"
                }`}
              >
                {course.title}
              </h6>
            </div>
          ))}
        </div>
        <div className="col-md-8 d-flex flex-column align-items-center justify-content-center gap-5 flex-sm-row py-3">
          <div className="d-flex flex-column gap-1">
            <h5 className="title">{courses[selectedIndex].title}</h5>
            <p className="text-white">{courses[selectedIndex].description}</p>
               
            </div>
          <img
            src={courses[selectedIndex].image}
            alt=""
            className="image col-md-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
