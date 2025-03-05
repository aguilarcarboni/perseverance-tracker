import React from 'react'
import { useState } from 'react';

import useFetch from '../../../hooks/useFetch.js'
import LoadingComponent from '../../misc/LoadingComponent.js';
import ErrorComponent from '../../misc/ErrorComponent.js';

import { fetchTypes } from '../../../utils/types.ts';

import ArrowButton from '../../misc/ArrowButton.js';

const Carousel = () => {

  const {data, loading, error} = useFetch(fetchTypes.IMAGES)

    var [index,setIndex] = useState(0)
  
    const pickPhoto = count => {
      setIndex(count)
    }

    const nextPhoto = () => {
      if (index <= data.length-2) {
        setIndex(index+1)
      }
      else {
        setIndex(0)
      }
    }

    const previousPhoto = () => {
      if (index >= 1) {
        setIndex(index-1)
      }
      else {
        setIndex(data.length-1)
      }
    }

    if (loading) {
      return (
        <LoadingComponent/>
      )
    } else if (error) {
      return (
        <ErrorComponent />
      )
    } else {
    return (
      <div className='carouselContainer'>
        <div className='photoContainer'>
          <img className='photo' src={data[index]} alt='Image'/> 
        </div>
        <div className='picker'>
          <div className='photos'>
            {data.map((photo,count) =>
              count < index+3 && count > index-3 ? 
                <img className = 'photo' key = {count} onClick={() => pickPhoto(count)} src = {photo} alt="carroussel"/>:''
            )}
          </div>
          <div className='pagination'>
            <ArrowButton onClick = {previousPhoto} direction = {'left'}/>
            <h3 className='subtitle'>Photo {index+1} of {Math.floor(data.length)} </h3>
            <ArrowButton onClick = {nextPhoto} direction = {'right'}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel