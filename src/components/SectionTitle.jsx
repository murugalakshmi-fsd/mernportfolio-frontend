import React from 'react'
import '../CSS/SectionTitle.css'


function SectionTitle ({
    title,
})  {
  return (
    <div className='container d-flex align-items-center gap-4 py-4'>
    <h3 className='title fw-semibold'>{title}</h3>
    <div className='line'></div>
    </div>
  )
}

export default SectionTitle