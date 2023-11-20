import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <Link className='link' to="/">
          <h3 className='text'> Home </h3>
        </Link>
        <Link className='link' to="/aboutD">
            <h3 className='text'> About </h3>
        </Link>
        <Link className='link' to="/mapD">
          <h3 className='text'> Map </h3>
        </Link>
        <Link className='link' to="/photosD">
          <h3 className='text'> Photos </h3>
        </Link>
      </div>
    </div>
  )
}

export default Navbar