import Header from "../../components/Header";
import React, { useEffect } from "react";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";
import '../../CSS/adminindex.css'

const { TabPane } = Tabs;

const Index = () => {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(()=>{
  if(!localStorage.getItem("token")){
    window.location.href = '/admin-login';
  }
  },[]);

  return (
    <div className="bg-white">
      <div className='portfolio d-flex gap-10 align-items-center px-2 py-2 justify-content-between '>
      
      <h5 className='my-2 p-1 text-success'>Portfolio Admin</h5>
      
      <div className="logout"
        onClick={()=>{
        localStorage.removeItem("item");
        window.location.href = "/";
      }
      }
      >Logout</div>
      </div>
        {portfolioData && (
        <div className="mt-2 px-2 pb-10">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <AdminExperiences/>
            </TabPane>
            <TabPane tab="Project" key="4">
              <AdminProjects/>
            </TabPane>
            <TabPane tab="Course" key="5">
              <AdminCourses/>
            </TabPane>
            <TabPane tab="Contact" key="6">
              <AdminContact/>
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Index;
