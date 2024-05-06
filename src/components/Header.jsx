import React from 'react';
import '../CSS/Header.css';

const Header = () => {
  return (
    <div className='header p-2 d-flex justify-content-between'>
        <h3 className='L1 fs-4xl fw-semibold'>M</h3>
        <h3 className='L2 fs-4xl fw-semibold'>A</h3>
        <h3 className='L3 fs-4xl fw-semibold'>S</h3>
    </div>
  )
}

export default Header