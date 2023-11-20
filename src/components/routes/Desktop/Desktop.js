import React from 'react'
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom'

import Navbar from './components/Navbar'
import SolCounter from './components/SolCounter'

import Home from './Home/Home'
import About from './About/About'
import Map from './Map/Map'
import Photos from './Photos/Photos'
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
      <Route path='/aboutD' element={<About />} />
      <Route path='/mapD' element={<Map />} />
      <Route path='/photosD' element={<Photos />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  )
}

export default Desktop