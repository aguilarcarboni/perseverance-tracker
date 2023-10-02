import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomeDesktop from './components/DesktopRoutes/HomeDesktop'
import AboutDesktop from './components/DesktopRoutes/AboutDesktop'
import MapDesktop from './components/DesktopRoutes/MapDesktop'
import PhotosDesktop from './components/DesktopRoutes/PhotosDesktop'

const DesktopR = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeDesktop />} />
      <Route path='/aboutD' element={<AboutDesktop />} />
      <Route path='/mapD' element={<MapDesktop />} />
      <Route path='/photosD' element={<PhotosDesktop />} />
    </Routes>
  </BrowserRouter>
  )
}

export default DesktopR