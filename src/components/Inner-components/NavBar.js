import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className='navBarContainer'>
        <Link to="/">
          <button className='navBarBtn'> Home </button>
        </Link>
        <Link to="/aboutD">
            <button className='navBarBtn'> About </button>
        </Link>
        <Link to="/mapD">
          <button className='navBarBtn'> Map </button>
        </Link>
        <Link to="/photosD">
          <button className='navBarBtn'> Photos </button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar