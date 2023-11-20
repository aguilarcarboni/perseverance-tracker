import React from 'react'

const PhotosToggle = ({onClick,showCarroussel}) => {
  return (
    <div className='galleryContainer'>
        <button className = 'btn'onClick = {onClick}>
          <span className={showCarroussel ? 'line1':'line'}></span>
          <span className={showCarroussel ? 'line2':'line'}></span>
          <span className={showCarroussel ? 'line2':'line'}></span>
        </button> 
    </div>
  )
}

export default PhotosToggle