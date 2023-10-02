import React from 'react'

const CarrousselBtn = ({onClick, direction}) => {
  return (
    <div>
        <button className='btn_carroussel' style={{ transform: direction === 'left' ? 'rotate(180deg)':''}} onClick={onClick}> > </button>
    </div>
  )
}

export default CarrousselBtn