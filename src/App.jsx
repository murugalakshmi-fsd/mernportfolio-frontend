import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter,Routes,Route, Outlet } from 'react-router-dom'
import Home from './pages/Home/Index'
import Admin from './pages/Admin/Index'
import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootslice'
import Login from './pages/Admin/Login'
import AdminRegister from './pages/Admin/AdminRegister'
import Layout from './pages/Home/Layout'
import About from './pages/Home/About'
import Experiences from './pages/Home/Experiences'
import Courses from './pages/Home/Courses'
import Projects from './pages/Home/Projects'
import Contact from './pages/Home/Contact'

// import { saveAs } from 'file-saver';
// import MyPDFDocument from './pages/Home/PDFDocument'

function App() {
  const {loading,portfolioData,reloadData} = useSelector((state)=>state.root);
  const dispatch = useDispatch();
  
  const getportfolioData=async()=>{
    try{
      dispatch(ShowLoading());
      const response=await axios.get('http://localhost:5000/api/portfolio//get-portfolio-data');
      //console.log(response.data);
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false))
      dispatch(HideLoading());
    }catch(error){
      dispatch(HideLoading());
    }
  }
  useEffect(()=>{
    if(!portfolioData){
    getportfolioData();
    }
  },[portfolioData]);

  useEffect(()=>{
  if(reloadData){
    getportfolioData();
  }
  },[reloadData]);

  return (
    <>
     <BrowserRouter>
     {loading?<Loader/>:null}
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home />}/>
      <Route path="about" element={<About/>}/>
      <Route path="experience" element={<Experiences/>}/>
      <Route path="project" element={<Projects/>}/>
      <Route path="course" element={<Courses/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="admin" element={<Admin/>}/>
      <Route path="admin-login" element={<Login/>}/>
      <Route path="admin-register" element={<AdminRegister/>}/>
     </Route>
     </Routes>
    
     </BrowserRouter>
    </>
  )
}


export default App
