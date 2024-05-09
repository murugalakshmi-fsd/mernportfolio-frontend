import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import "../CSS/Projects.css";
import { useSelector } from "react-redux";

const Projects = () => {
  const [selectedIndex, setselectedIndex] = useState(0);
  const {loading,portfolioData}=useSelector((state)=>state.root);
  const {projects}=portfolioData || {};
  return (
    <div className="p-4">
      <SectionTitle title="Projects" />
      <div className="container d-flex flex-column flex-sm-row py-10 gap-10">
        <div className="col-md-4 d-flex flex-md-column gap-3 border-start border-1 border-secondary flex-sm-row projecttitle">
          {projects.map((project, index) => (
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
                {project.title}
              </h6>
            </div>
          ))}
        </div>
        <div className="col-md-8 d-flex flex-column align-items-center justify-content-center gap-5 flex-sm-row py-3">
            <img src={projects[selectedIndex].image} alt="" className="image col-md-4"/>
        <div className="d-flex flex-column gap-2">
          <h5 className="title">{projects[selectedIndex].title}</h5>
          <p className="text-white">{projects[selectedIndex].description}</p>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Projects;
