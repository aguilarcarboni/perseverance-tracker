import React from 'react'
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom'

import Navbar from './components/Navbar'
import SolCounter from './components/SolCounter'

import Home from './Home/Home'
import AboutDesktop from './About/AboutDesktop'
import MapDesktop from './Map/MapDesktop'
import PhotosDesktop from './Photos/PhotosDesktop'
import Footer from './components/Footer'

const Desktop = () => {
  return (
  <BrowserRouter>
    <div className='header'>
      <div className='title'>
        <Link to='/' className='link'>
          <h1> 
            Perseverance Tracker
          </h1>
        </Link>
        <SolCounter />
      </div>
      <Navbar />
    </div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/aboutD' element={<AboutDesktop />} />
      <Route path='/mapD' element={<MapDesktop />} />
      <Route path='/photosD' element={<PhotosDesktop />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  )
}

export default Desktop