import React from 'react'
import { useState, useEffect } from 'react';
import Papa from 'papaparse'

const SolCounter = () => {
    const sol = 585;
  return (
      <h3 className='solCounter'>Sol: {sol}</h3>
  )
}

export default SolCounter