import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import useFetch from '../../../../hooks/useFetch'

import MarsMap from './components/MarsMap';
import MostRecentPhoto from './components/MostRecentPhoto';
import Papa from 'papaparse'
const Home = () => {
  
  var [data,setData] = useState([])

  const {dats} = useFetch('https://perseverance-tracker.onrender.com', 3)

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
    <div className='homeContainer' style={{backgroundImage: "url(Assets/IMG/stars.png)", backgroundSize: 'cover'}}>
      <div className='intro'>
        <h2 className='title' style={{fontSize:'1.8vmax',marginTop:15}}>Who is Perseverance?</h2> 
        <h3 className='caption'>Perseverance, or Perse, is a rover sent out by NASA to Mars. Similar to any other rover we have sent in the past, Perse roams around Mars completing his mission and recollecting data.</h3>
        <Link className='link' to="/aboutD">
          <h4 className='caption' href=''>Learn more.</h4>
        </Link>
        <MarsMap data = {data} height={'50%'} width={'100%'}/>
      </div>
      <div className='recentPhoto'>
        <MostRecentPhoto /> 
      </div>
    </div>
  )
}

export default Home