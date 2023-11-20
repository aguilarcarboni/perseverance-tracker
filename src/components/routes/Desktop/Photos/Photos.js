import React from 'react'
import { useState } from 'react';

import useFetch from '../../../../hooks/useFetch'
import LoadingComponent from '../components/LoadingComponent.js';
import ErrorComponent from '../components/ErrorComponent.js';

import { fetchTypes } from '../../../../utils/types.ts';

import Carousel from './components/Carousel.js';
import Toggler from './components/Toggler.js';
import Gallery from './components/Gallery.js'

const Photos = () => {
  const {data, loading, error} = useFetch(fetchTypes.IMAGES)
  var [showCarroussel, setShowCarroussel] = useState(false)
  if (loading) {
    return (
      <LoadingComponent/>
    )
  } else if (error) {
    return (
      <ErrorComponent />
    )
  }
  else {
    return (
      <div className='photosContainer'>
        <Toggler onClick = {() => setShowCarroussel(!showCarroussel)} showCarroussel = {showCarroussel}/>
        {showCarroussel ? <Carousel data = {data}/>:<Gallery data = {data}/>}
        </div>
    )
  }
}

export default Photos