import React from 'react'
import { useState } from 'react';
import { Map, Marker, ZoomControl } from "pigeon-maps"

const MarsMap = ({data, width, height}) => {
  
  const [center, setCenter] = useState([18.445, 77.44])
  const [zoom, setZoom] = useState(12)
  const maxZoom = 15
  const minZoom = 3

  function mapTiler (x, y, z) {
      return `https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/${z}/${x}/${y}.png`
    }
    
  function handleChange () {
    setCenter([18.445, 77.44])
    setZoom(12)
  }

  return (
    <div className='map' style={{width:width, height:height}} >
      <Map 
        center={center} 
        minZoom = {minZoom} 
        maxZoom = {maxZoom} 
        zoom={zoom} 
        dprs={[1,2]} 
        onBoundsChanged={({ center, zoom }) => {setCenter(center); setZoom(zoom) }} 
        margin={0} 
        provider={mapTiler}>
        {data.map((arr,index) => 
          <Marker key={index} width={5} anchor={arr} onClick={() => console.log(arr)}/>
        )}
        <ZoomControl />
        <button className='btnReset' onClick={handleChange}>
          <img style={{width:'40%'}} src="Assets/IMG/mapCenter.png" alt='Center Map'/>
        </button>
      </Map>
    </div>
  )
}

export default MarsMap