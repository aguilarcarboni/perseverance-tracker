import React from 'react'

const GalleryPopout = ({url}) => {
  console.log(url)
  return (
    <div className='galleryPopoutContainer'>
      <div className='galleryPopout'>
        <div className='galleryPopoutImageContainer'>
          <img src={url} alt='current'className='galleryPopoutImage'></img>
        </div>
      </div>
    </div>
  )
}

export default GalleryPopout