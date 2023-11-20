import React from 'react'

const GalleryPopout = ({selected, setSelected}) => {
  return (
    <div className='popoutContainer' onClick={() => setSelected(null)}>
      <btn className='exitButton' onClick={() => setSelected(null)}>X</btn>
      <div className='popout'>
        <img src={selected} alt='current' className='photo'></img>
      </div>
    </div>
  )
}

export default GalleryPopout