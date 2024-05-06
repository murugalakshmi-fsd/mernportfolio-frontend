import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { experiences} from'../../resources/experiences'
import '../../CSS/Experience.css'
import { useSelector } from 'react-redux'
const Experiences = () => {
  const [selectedIndex,setselectedIndex]=useState(0);
  const {loading,portfolioData}=useSelector((state)=>state.root);
  const {experiences}=portfolioData || {};
 

  return (
    <div className='container'>
       <SectionTitle title="Experiences"/>
       <div className="container">
        <div className=' d-flex flex-column py-10 gap-10 flex-sm-row'>
            <div className='col-md-4 d-flex flex-md-column gap-3 border-start border-1 border-secondary flex-sm-row'> 
              {experiences.map((experience,index)=>(
                <div onClick={()=>{
                  setselectedIndex(index);
                }} className='period'>
                    <h6 className={`px-2 ${selectedIndex===index? "selecttext border-start border-3 border-success-subtl py-2":"text" }`}>{experience.period}</h6>
                </div>
              ))}
            </div>
            <div className='col-md-8 d-flex flex-column gap-2'>
              <h5 className='title'>{experiences[selectedIndex].title}</h5>
              <h6 className='company'>{experiences[selectedIndex].company}</h6>
              <p className='description'>{experiences[selectedIndex].description}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Experiences