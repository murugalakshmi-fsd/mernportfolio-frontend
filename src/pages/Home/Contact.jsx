import React from "react";
import SectionTitle from "../../components/SectionTitle";
import "../../CSS/Contact.css";
import { useSelector } from "react-redux";
const Contact = () => {
    const {portfolioData}=useSelector((state)=>state.root);
    const {contacts} = portfolioData;
  return (
    <div className="p-4">
      <SectionTitle title="Say Hello" />
      <div className="container d-flex flex-md-row flex-column align-items-center justify-content-between ">
        <div className="col-md-6 d-flex flex-column gap-0">
          <p className="text-white">{"{"}</p>
          {Object.keys(contacts).map((key) => key !== "_id" && (
            <p className="ms-2">
              <span className="text">{key}</span>:{" "}
              <span className="text">{contacts[key]}</span>
            </p>
          ))}
          <p className="text-white">{"}"}</p>
        </div>
        <div className="col-md-6 image">
            <img src="data:image/jpeg;base64,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" alt=""/>
      </div> 
      </div>
    </div>
  );
};

export default Contact;