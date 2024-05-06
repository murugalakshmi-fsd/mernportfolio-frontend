import React from "react";
import "../../CSS/intro.css";
import { useSelector } from "react-redux";
import axios from "axios";
const Intro = () => {
  const {loading,portfolioData}=useSelector((state)=>state.root);
  const {intros}=portfolioData || {};
  const {firstName,lastName,welcomeText,caption,description}=intros || {} ;

  const handleExportPDF = async () => {
    try {
      const response = await axios.get('https://mernportfolio-backend.onrender.com/portfolio/export-pdf', {
        responseType: 'blob', // Set response type to blob
      });

      // Create a blob URL for the PDF file
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to trigger the file download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'portfolio.pdf');
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="container intro d-flex flex-column align-items-start justify-content-center gap-2">
        <h4 className="t1">{welcomeText || ''}</h4>
        <h2 className="t2 fw-semibold">{firstName||''} {lastName||''}</h2>
        <h2 className="t2 fw-semibold">{caption||""}</h2>
        <p className="t3">
          {description||''}
        </p>
        <button className=" get border-1 border-primary p-2 rounded" onClick={handleExportPDF}>
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default Intro;
