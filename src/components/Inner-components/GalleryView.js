import React, { useState } from 'react'
import CarrousselBtn from './CarrousselBtn'
import GalleryPopout from './GalleryPopout'

const PhotosToggle = ({data}) => {

  var [number,setNum] = useState(0)
  var [page, setPage] = useState(0)
  var [popout, showPopout] = useState(false)
  var [url,setUrl] = useState(0)
  
  const handleChange = (count,arr) => {
    setUrl(arr)
    if (popout === false) {
      showPopout(true)
    }
    else{
      showPopout(false)
    }
  }

  const nextPage = () => {
    if (number < data.length-12) {
      setNum(number+12)
      setPage(page+1)
    }
    else {
      setNum(0)
      setPage(0)
    }
  }
  const prevPage = () => {
    if (number >= 2) {
      setNum(number-12)
      setPage(page-1)
    }
    else {
      setNum(data.length-12)
      setPage(Math.floor(data.length/12))
    }
  }

  return (
    <div>
      {popout ? <GalleryPopout url = {url}/>:''}
      {popout ? <btn className='galleryPopoutX' onClick={handleChange}>X</btn>:''}
      <div className = 'galleryOutside'>
      <CarrousselBtn onClick = {prevPage} direction = {'left'}/>
      <div className='galleryContainer'>
          {data.map((arr,count) => count < number+12 && count > number-1
          ?<img  className = 'galleryPhotos' src={arr} alt={count} onClick = {() => handleChange(count,arr)}></img>:'')}
      </div>
      <CarrousselBtn onClick = {nextPage} direction = {'right'}/>
      </div>
      <h1 className='photoCounter'>Page {page+1} of {Math.floor(data.length/12)+1} </h1>
    </div>
  )
}

export default PhotosToggle