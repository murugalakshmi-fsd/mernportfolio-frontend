import React, { useEffect } from 'react'
import Intro from './Intro'
import About from './About'
import '../CSS/Index.css'
import Experiences from './Experiences'
import Projects from './Projects'
import Courses from './Courses'
import Contact from './Contact'
import Footer from './Footer'
import Leftside from './Leftside'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioData } from '../redux/rootslice'

const Home = () => {
  const dispatch = useDispatch()
  const {loading,portfolioData}=useSelector((state)=>state.root);
  
  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);
  
  return (
    <div className='home'>
        
        {portfolioData && ( <div className='px-5'>
        <Intro/>
        <About/>
        <Experiences/>
        <Projects/>
        <Courses/>
        <Contact/>
        {/* <Footer/>
        <Leftside/> */}
        </div>)}
       
    </div>
  )
}

export default Home