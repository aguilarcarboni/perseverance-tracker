import React from 'react'
import { useState } from 'react';
import ArrowButton from '../../../../Inner-components/ArrowButton';

const Carousel = ({data}) => {

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

  return (
    <div className='carouselContainer'>
      <div className='main'>
        <ArrowButton onClick = {previousPhoto} direction = {'left'}/>
        <img className='photo' src={data[index]} alt='Most recent'/> 
        <ArrowButton onClick = {nextPhoto} direction = {'right'}/>
      </div>
      <div className='picker'>
        <div className='photos'>
          {data.map((photo,count) =>
            count < index+3 && count > index-3 ? 
              <img className = 'photo' key = {count} onClick={() => pickPhoto(count)} src = {photo} alt="carroussel"/>:''
          )}
        </div>
        <h3 className='subtitle'>Photo {index+1} of {Math.floor(data.length)} </h3>
      </div>
    </div>
  )
}

export default Carousel