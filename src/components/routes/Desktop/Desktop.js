import React from 'react'
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom'

import {routeTypes} from '../../../utils/types.ts'

import Navbar from './components/Navbar'
import SolCounter from './components/SolCounter'

import Home from './Home/Home'
import About from './About/About'
import Map from './Map/Map'
import Photos from './Photos/Photos'
import Footer from './components/Footer'

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