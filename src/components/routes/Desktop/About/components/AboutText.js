import React from 'react'

const AboutText = () => {
  return (
    <div style={{display:'block', marginLeft:'2vmax'}}>
        <h1 className='captions' style={{fontSize:'1.5vmax',marginTop:'3.5vmax'}}>What is Perseverance?</h1>
        <h2 className='info'>Perseverance, or Perse, is a rover sent out by NASA to Mars. Similar to any other rover we have sent in the past, Perse roams around Mars completing his mission and recollecting data.</h2>
        <h1 className='captions' style={{fontSize:'1.5vmax',marginTop:'1vmax'}}>So what is his mission?</h1>
        <h2 className='info'>Perseverance will look for evidence of past and current life on Mars, as well as test new technology that can benefit future human journeys to the planet.</h2>
        <h1 className='captions' style={{fontSize:'1.5vmax',marginTop:'1vmax'}}>More information about Perse</h1>
        <h2 className='info'>Oficial NASA website</h2>
        <a target="_blank" className='links' style={{fontSize:'1.3vmax'}} href="https://mars.nasa.gov/mars2020/">Learn more.</a>
    </div>
  )
}

export default AboutText