import React, { useState }  from 'react'

import useFetch from "../../../../hooks/useFetch.js"

import { fetchTypes } from "../../../../utils/types.ts"

import { Map, Marker, ZoomControl } from "pigeon-maps"
import { Crosshair } from 'react-bootstrap-icons'

const MarsMap = ({width, height}) => {

  const {data, loading, error} = useFetch(fetchTypes.COORDS)
  
  const [center, setCenter] = useState([18.445, 77.44])
  const [zoom, setZoom] = useState(5)
  const maxZoom = 20
  const minZoom = 3

  function mapTiler (x, y, z) {
      return `https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/${z}/${x}/${y}.png`
    }
    
  function resetView () {
    setCenter([18.445, 77.44])
    setZoom(12)
  }

  function zoomOut () {
    setCenter([18.445, 77.44])
    setZoom(3)
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
        {!loading && !error && data && data.map((coord,index) => 
          <Marker key={index} width={5} anchor={[coord['lat'], coord['lon']]} onClick={() => console.log(coord)}/>
        )}
        <div className='zoomButtons'>
          <button className='resetZoomButton' onClick={resetView}>
            <Crosshair size={'60%'} color='black'/>
          </button>
          <button className='resetZoomButton' onClick={zoomOut}>
            <Crosshair size={'60%'} color='black'/>
          </button>
        </div>
      </Map>
    </div>
  )
}

export default MarsMap