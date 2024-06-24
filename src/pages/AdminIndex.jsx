import React, { useEffect } from "react";
import { Tabs, Button, message } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useDispatch, useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";
import '../CSS/adminindex.css'
import { fetchPortfolioData, setPortfolioData, setReloadData } from "../redux/rootslice";


const { TabPane } = Tabs;

const Index = () => {
  const { portfolioData,reloadData } = useSelector((state) => state.root);
  const dispatch =useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("welcome")
      window.location.href = '/';
    }
  }, []);
  
  useEffect(() => {
    if (!portfolioData) {
      dispatch(fetchPortfolioData());
    }
  }, [portfolioData, dispatch]);

  useEffect(() => {
    if (reloadData) {
      dispatch(fetchPortfolioData());
      dispatch(setReloadData(false));
    }
  }, [reloadData, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const validateSections = () => {
    const { intro, about, experiences, projects, courses, contact } = portfolioData;

    if (!intro || !intro.title || !intro.description) {
      message.error("Intro section is incomplete.");
      return false;
    }
    if (!about || !about.description) {
      message.error("About section is incomplete.");
      return false;
    }
    if (!experiences || experiences.length === 0) {
      message.error("Experience section is incomplete.");
      return false;
    }
    if (!projects || projects.length === 0) {
      message.error("Project section is incomplete.");
      return false;
    }
    if (!courses || courses.length === 0) {
      message.error("Course section is incomplete.");
      return false;
    }
    if (!contact || !contact.email || !contact.phone) {
      message.error("Contact section is incomplete.");
      return false;
    }
    return true;
  };

  const handleGoToPortfolio = () => {
   
      window.location.href = "/home"; // Change this to the portfolio page URL
   
  };

  return (
    <div className="bg-white">
      <div className='portfolio d-flex gap-10 align-items-center px-2 py-2 justify-content-between '>
        <h5 className='my-2 p-1 text-success'>Portfolio Admin</h5>
        <div className="buttons">
          <Button type="primary" onClick={handleGoToPortfolio}>
            Go to Portfolio
          </Button>
          <Button type="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    
        <div className="mt-2 px-2 pb-10">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <AdminExperiences />
            </TabPane>
            <TabPane tab="Project" key="4">
              <AdminProjects />
            </TabPane>
            <TabPane tab="Course" key="5">
              <AdminCourses />
            </TabPane>
            <TabPane tab="Contact" key="6">
              <AdminContact />
            </TabPane>
          </Tabs>
        </div>

    </div>
  );
};

export default Index;
