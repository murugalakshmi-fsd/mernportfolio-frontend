import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter,Routes,Route, Outlet } from 'react-router-dom'
import Home from './pages/Index'
import Admin from './pages/AdminIndex'
import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootslice'
import Login from './pages/Login'
import AdminRegister from './pages/AdminRegister'
import Layout from './pages/Layout'
import About from './pages/About'
import Experiences from './pages/Experiences'
import Courses from './pages/Courses'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  const {loading,portfolioData,reloadData} = useSelector((state)=>state.root);
  const dispatch = useDispatch();
  
  const getportfolioData=async()=>{
    try{
      dispatch(ShowLoading());
      const response=await axios.get('https://mernportfolio-backend.onrender.com/portfolio');
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
      <Route index element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="experience" element={<Experiences/>}/>
      <Route path="project" element={<Projects/>}/>
      <Route path="course" element={<Courses/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="admin-login" element={<Login/>}/>
      <Route path="admin-register" element={<AdminRegister/>}/>
      <Route path="admin" element={<Admin/>}/>
     </Route>
     </Routes>
    
     </BrowserRouter>
    </>
  )
}


export default App
