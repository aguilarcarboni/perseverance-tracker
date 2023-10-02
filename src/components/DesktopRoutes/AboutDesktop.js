import React from 'react'
import NavBar from '../Inner-components/NavBar'
import Header from '../Inner-components/Header'
import SolCounter from '../Inner-components/SolCounter'
import { Link } from 'react-router-dom'
import AboutText from '../Inner-components/AboutText'

const AboutDesktop = () => {
  return (
    <div className={'container'} style={{backgroundImage: "url(Assets/IMG/backg.png)", backgroundSize: 'cover'}}>
      <NavBar />
      <Link to='/' style={{textDecoration:'none'}}>
        <Header />
      </Link>
      <SolCounter />
      <div className='midBlock' style={{maxHeight:'32vmax',marginBottom:'-.3vmax'}}>
        <AboutText />
        <iframe className = 'rover' src="https://mars.nasa.gov/gltf_embed/25042" title='3D Model'/>
      </div>
      <img className = 'nasaLogo' src={'Assets/IMG/nasaLogo.png'} alt="Nasa Logo" />
    </div>
  )
}

export default AboutDesktop