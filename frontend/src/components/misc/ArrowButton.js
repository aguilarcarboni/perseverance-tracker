import React from 'react'

import { CaretRightSquareFill } from 'react-bootstrap-icons'

const CarrousselBtn = ({onClick, direction}) => {
  return (
      <button className='arrowButton' style={{ transform: direction === 'left' ? 'rotate(180deg)':''}} onClick={onClick}> 
        <CaretRightSquareFill className='icon'/>
      </button>
  )
}

export default CarrousselBtn