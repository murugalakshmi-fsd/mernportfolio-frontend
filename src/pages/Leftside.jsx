import React from 'react'
import { CiFacebook ,CiMail} from "react-icons/ci";
// import { FaBootstrap } from "react-icons/fa";
import { FaXTwitter,FaInstagram,FaGithub,FaLinkedinIn } from "react-icons/fa6";
import "../CSS/Leftside.css"

const Leftside = () => {
  return (
    <div className='position-fixed bottom-0 start-0 px-3'>
       <div className='d-flex flex-column align-items-center'>
       <div className='d-flex flex-column gap-4'>
       
        <a href='https://www.google.com/'><i><CiFacebook color='#62B58E' ize={15}/></i></a>
        
        <a href='https://www.google.com/'><i><CiMail color='#62B58E' size={15}/></i></a>
        
        
        <a href='https://www.google.com/'><i><FaGithub color='#62B58E' size={15}/></i></a>
        
        
        <a href='https://www.google.com/'><i><FaXTwitter color='#62B58E' size={15}/></i></a>
        
        
        <a href='https://www.google.com/'><i><FaInstagram color='#62B58E' size={15}/></i></a>
        
        
        <a href='https://www.google.com/'><i><FaLinkedinIn color='#62B58E' size={15}/></i></a>
             
        </div>
        <hr style={{ 
        backgroundColor:'#62B58E', 
        height: '80px',
        width:'1px', 
        border: 'none' 
      }} />
      
       </div>
    </div>
  )
}

export default Leftside