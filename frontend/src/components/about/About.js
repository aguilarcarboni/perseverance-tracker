import React from 'react'

const About = () => {
  return (
    <div className='aboutContainer'>
      <div className='info'>
        <h2 className='title'>What is Perseverance?</h2>
        <h3 className='subtitle'>Perseverance, or Perse, is a rover sent out by NASA to Mars. Similar to any other rover we have sent in the past, Perse roams around Mars completing his mission and recollecting data.</h3>
        <h2 className='title'>So what is his mission?</h2>
        <h3 className='subtitle'>Perseverance will look for evidence of past and current life on Mars, as well as test new technology that can benefit future human journeys to the planet.</h3>
        <a target="_blank" rel='noreferrer' className='link' href="https://mars.nasa.gov/mars2020/">Learn more information about Perse</a>
      </div>
      <div className='rover'>
        <h2 className='title'>3D Model</h2>
        <iframe className ='model' allowtransparency="true" src="https://mars.nasa.gov/gltf_embed/25042" title='3D Model' height={'100%'} width={'100%'}/>
      </div>
    </div>
  )
}

export default About