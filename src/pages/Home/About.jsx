import React from "react";
import SectionTitle from "../../components/SectionTitle";
import "../../CSS/about.css";
import { useSelector } from "react-redux";
const About = () => {
  const {loading,portfolioData}=useSelector((state)=>state.root);
  const {abouts}=portfolioData || {};
  const {lottieUrl,description1,description,skills}=abouts || {} ;
  return (
    <div className="p-4 about">
      <SectionTitle title="About"/>
      <div className="container row d-flex align-items-center">
        <div className="image col-md-6 ">
          <dotlottie-player
            src={lottieUrl}
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
        <div className=" col-md-6 d-flex flex-column gap-2">
          <p>
            {description1}
          </p>
          <p>
            {description}
          </p>
        </div>
      </div>
      <div className="container py-2">
        <h5>Here are a few technologies I'have been writing with recently:</h5>
        <div className="d-flex flex-wrap gap-5 mt-3">
        {skills.map((skill,index)=>(
          <div className="border border-primary px-2 py-2 rounded">
            <h6>{skill}</h6>
          </div>
        ))}
        </div>
      </div>
    </div>
    
  );
};

export default About;
