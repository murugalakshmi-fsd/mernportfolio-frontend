import React from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import '../../CSS/Index.css'
import Experiences from './Experiences'
import Projects from './Projects'
import Courses from './Courses'
import Contact from './Contact'
import Footer from './Footer'
import Leftside from './Leftside'
import { useSelector } from 'react-redux'

const Home = () => {
  const {loading,portfolioData}=useSelector((state)=>state.root);
  return (
    <div className='home'>
        
        {portfolioData && ( <div className='px-5'>
        <Intro/>
        <About/>
        <Experiences/>
        <Projects/>
        <Courses/>
        <Contact/>
        <Footer/>
        <Leftside/>
        </div>)}
       
    </div>
  )
}

export default Home