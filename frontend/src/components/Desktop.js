import React from 'react'
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom'

import {routeTypes} from '../utils/types.ts'

import Navbar from './Navbar.js'
import SolCounter from './misc/SolCounter.js'

import Home from './home/Home.js'
import About from './about/About.js'
import Map from './map/Map.js'
import Photos from './photos/Photos.js'
import Footer from './Footer.js'

const Desktop = () => {

  const state = routeTypes.DESKTOP

  const currentPath = '/d/'
  window.history.replaceState(null, "", currentPath)
  
  return (
    <BrowserRouter>
      <div className='header'>
        <div className='title'>
          <Link to='/d/' className='link'>
            <h1> 
              Perseverance Tracker
            </h1>
          </Link>
          <SolCounter />
        </div>
        <Navbar state={state}/>
      </div>
      <Routes>
        <Route path='/d/' element={<Home />} />
        <Route path='/d/about' element={<About />} />
        <Route path='/d/map' element={<Map />} />
        <Route path='/d/photos' element={<Photos />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Desktop