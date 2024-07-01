import React, { useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import "../CSS/about.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolioData } from "../redux/rootslice";
const About = () => {
  const dispatch=useDispatch();
  const {loading,portfolioData}=useSelector((state)=>state.root);
  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);
  
  const {portfolio}=portfolioData || {};
  const {lottieUrl,description1,skills}=portfolio.about || {} ;
  
  
  return (
    <div className="p-4">
      <SectionTitle title="About"/>
      <div className="container row d-flex align-items-center">
        <div className="image col-md-6 ">
        <img
            src={lottieUrl}
            alt=""
            className="image col-md-4"
          />
        </div>
        <div className=" col-md-6 d-flex flex-column gap-2">
        
          <p>
            {description1}
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
