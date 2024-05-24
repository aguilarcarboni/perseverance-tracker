import React, { useState } from 'react'

import useFetch from '../../../../../hooks/useFetch'
import LoadingComponent from '../../misc/LoadingComponent.js';
import ErrorComponent from '../../misc/ErrorComponent.js';

import { fetchTypes } from '../../../../../utils/types.ts';

import ArrowButton from '../../../../Inner-components/ArrowButton'
import GalleryPopout from '../../../../Inner-components/GalleryPopout'

const Gallery = () => {

  const {data, loading, error} = useFetch(fetchTypes.IMAGES)

  const [number,setNum] = useState(0)
  const [page, setPage] = useState(0)

  const [selected, setSelected] = useState(null)

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

  const previousPage = () => {
    if (number >= 2) {
      setNum(number-12)
      setPage(page-1)
    }
    else {
      setNum(data.length-12)
      setPage(Math.floor(data.length/12))
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
      <div className='galleryContainer'>
        {selected && <GalleryPopout selected = {selected} setSelected={setSelected}/>}
        <div className='gallery'>
            {data.map((photo,count) => count < number+12 && count > number-1 && 
              <img key = {count} className = 'photo' src={photo} alt={count} onClick = {() => setSelected(photo)}></img>
            )}
        </div>
        <div className='pagination'>
          <ArrowButton onClick = {previousPage} direction = {'left'}/>
          <h3 className='subtitle'>Page {page+1} of {Math.floor(data.length/12)+1} </h3>
          <ArrowButton onClick = {nextPage} direction = {'right'}/>
        </div>
      </div>
    )
  }
}

export default Gallery