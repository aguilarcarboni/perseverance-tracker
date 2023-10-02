import React from 'react'
import { useEffect, useState } from 'react';
import Map from './Map';
import WhoIsPerseverance from './WhoIsPerseverance';
import DailyPhoto from './DailyPhoto';
import Papa from 'papaparse'

const MidBlock = () => {

  var [data,setData] = useState([])

  useEffect(() => {
    Papa.parse('Assets/CSV/waypoints.csv', {
    header: true,
    skipEmptyLines: true,
    download: true,
    complete: function (results) {
        var arr = []
        var tempData = results.data
        for (var elem of tempData) {
          const x1 = parseFloat(elem.lon)
          const y1 = parseFloat(elem.lat)
          arr.push([y1,x1])
        }
        setData(arr)
      },
    });
  },[]);

  return (
    <div className={'midBlock'}>
      <div>
        <WhoIsPerseverance />
        <div className='mapContainer'> 
          <Map data = {data} height={'15vmax'} width={'25vmax'}/>
        </div>
      </div>
      <DailyPhoto /> 
    </div>
  )
}

export default MidBlock