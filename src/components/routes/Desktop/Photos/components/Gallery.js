import React, { useState } from 'react'
import ArrowButton from '../../../../Inner-components/ArrowButton'
import GalleryPopout from '../../../../Inner-components/GalleryPopout'

const Gallery = ({data}) => {

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

  return (
    <div className='galleryContainer'>
      {selected && <GalleryPopout selected = {selected} setSelected={setSelected}/>}
      <div className = 'main'>
        <ArrowButton onClick = {previousPage} direction = {'left'}/>
        <div className='gallery'>
            {data.map((photo,count) => count < number+12 && count > number-1 && 
              <img key = {count} className = 'photo' src={photo} alt={count} onClick = {() => setSelected(photo)}></img>
            )}
        </div>
        <ArrowButton onClick = {nextPage} direction = {'right'}/>
      </div>
      <h3 className='subtitle'>Page {page+1} of {Math.floor(data.length/12)+1} </h3>
    </div>
  )
}

export default Gallery