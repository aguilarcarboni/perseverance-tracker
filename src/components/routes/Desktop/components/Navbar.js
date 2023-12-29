import React from 'react'
import { Link } from "react-router-dom";
import { routeTypes } from '../../../../utils/types.ts';

const Navbar = ({state}) => {
  return (
    <div className='navbar'>
      <Link className='link' to={state === routeTypes.DESKTOP ? '/d/':'/m/'}>
        <h3 className='text'> Home </h3>
      </Link>
      <Link className='link' to={state === routeTypes.DESKTOP ? '/d/about':'/m/about'}>
          <h3 className='text'> About </h3>
      </Link>
      <Link className='link' to={state === routeTypes.DESKTOP ? '/d/map':'/m/map'}>
        <h3 className='text'> Map </h3>
      </Link>
      <Link className='link' to={state === routeTypes.DESKTOP ? '/d/photos':'/m/photos'}>
        <h3 className='text'> Photos </h3>
      </Link>
    </div>
  )
}

export default Navbar