import React from 'react'
import { useState, useEffect } from 'react';
import Papa from 'papaparse'

const SolCounter = () => {
    var [sol,setSol] = useState(0) // state vars
    useEffect(() => {
        Papa.parse('Assets/CSV/imageData.csv', {
            header: true,
            skipEmptyLines: true,
            download: true,
            complete: function (results) {
                var arr = []
                var tempData = results.data
                arr.push(tempData[tempData.length-1]['sol'])
                setSol(arr)
            },
        });
      }, []);

  return (
    <div>
        <h1 className='solCounter'>Sol: {sol}</h1>
    </div>
  )
}

export default SolCounter