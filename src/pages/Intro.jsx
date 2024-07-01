import React, { useEffect } from "react";
import "../CSS/intro.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolioData } from "../redux/rootslice";
import axiosInstance from "../axiosConfig";
const Intro = () => {
  const dispatch=useDispatch();
  const {loading,portfolioData}=useSelector((state)=>state.root);
  const {portfolio}=portfolioData || {};
  const {firstName,lastName,welcomeText,caption}=portfolio.intro|| {} ;
  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  const handleExportPDF = async () => {
    try {
      const response = await axiosInstance.get('/portfolio/export-pdf', {
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
   
      <div className="intro d-flex flex-column align-items-start justify-content-center gap-2 p-4 b-2">
        <h4 className="t1">{welcomeText || ''}</h4>
        <h2 className="t2 fw-semibold">{firstName||''} {lastName||''}</h2>
        <h2 className="t2 fw-semibold">{caption||""}</h2>
        <button className=" get border-1 border-primary p-2 rounded" onClick={handleExportPDF}>
          Export PDF
        </button>
      </div>
 
  );
};

export default Intro;
