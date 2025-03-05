import React from 'react'
import { useState } from 'react';

import Carousel from './components/Carousel.js';
import Toggler from './components/Toggler.js';
import Gallery from './components/Gallery.js'

const Photos = () => {
  var [showCarroussel, setShowCarroussel] = useState(false)
    return (
      <div className='photosContainer'>
        <Toggler onClick = {() => setShowCarroussel(!showCarroussel)} showCarroussel = {showCarroussel}/>
        {showCarroussel ? <Carousel/>:<Gallery/>}
      </div>
    )
}

export default Photos