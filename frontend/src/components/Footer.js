import React from 'react'
import nasaLogo from '../assets/images/nasaLogo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <img className = 'nasaLogo' src={nasaLogo}  alt="Nasa Logo"/>
    </div>
  )
}

export default Footer