import React from 'react'
import { useState } from 'react';
import CarrousselBtn from './CarrousselBtn';

const PhotoDisplayCar = ({data,showCarroussel}) => {
    var [index,setIndex] = useState(0)
  
    const handleChange = count => {
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
    const prevPhoto = () => {
      if (index >= 1) {
        setIndex(index-1)
      }
      else {
        setIndex(data.length-1)
      }
    }

  return (
    <div>
      <div className='carrousselUpper'>
        <CarrousselBtn onClick = {prevPhoto} direction = {'left'}/>
        <img className='carrousselMainPhoto' style={{maxWidth:'1vmax'}} src={data[index]} alt='Most recent'/> 
        <CarrousselBtn onClick = {nextPhoto} direction = {'right'}/>
      </div>
      <div className='carrousselLower'>
        {data.map((arr,count) =>
          count < index+3 && count > index-3 ? 
            <img className = 'carrousselPhotos' key = {count} onClick={() => handleChange(count)} src = {arr} alt="carroussel"/>:'')}
            <h1 className='photoCounter'>Photo {index+1} of {Math.floor(data.length)} </h1>
      </div>
    </div>
  )
}

export default PhotoDisplayCar