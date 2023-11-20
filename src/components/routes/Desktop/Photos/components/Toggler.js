import React from 'react'

const Toggler = ({onClick,showCarroussel}) => {
  return (
    <div className='toggler'>
        <button className = 'button' onClick = {onClick}>
          <p className='subtitle'>Toggle</p>
        </button> 
    </div>
  )
}

export default Toggler