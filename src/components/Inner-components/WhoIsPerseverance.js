import React from 'react'
import { Link } from 'react-router-dom'

const WhoIsPerseverance = () => {
  return (
    <div >
        <Link to="/aboutD" style ={{textDecoration: 'none'}}>
          <h1 className='captions' style={{fontSize:'1.8vmax',marginTop:15}}>Who is Perseverance?</h1> 
        </Link>
        <h2 className='info'>Perseverance, or Perse, is a rover sent out by NASA to Mars. Similar to any other rover we have sent in the past, Perse roams around Mars completing his mission and recollecting data.</h2>
        <Link to="/aboutD">
          <h1 className='links' href=''>Learn more.</h1>
        </Link>
    </div>
  )
}

export default WhoIsPerseverance