import React from 'react'
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom'

import {routeTypes} from '../../../utils/types.ts'

const Desktop = () => {
  const state = routeTypes.MOBILE

  const currentPath = '/m/'
  window.history.replaceState(null, "", currentPath)
  
  return (
    <div>
      <h1>{state}</h1>
    </div>
  )
}

export default Desktop