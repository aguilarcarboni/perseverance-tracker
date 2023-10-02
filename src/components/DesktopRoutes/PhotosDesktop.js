import React from 'react'
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NavBar from '../Inner-components/NavBar'
import PhotoDisplayCaroussel from '../Inner-components/PhotoDisplayCaroussel';
import Header from '../Inner-components/Header'
import PhotosToggle from '../Inner-components/PhotosToggle';
import GalleryView from '../Inner-components/GalleryView'
import SolCounter from '../Inner-components/SolCounter'
import { Link } from 'react-router-dom';

const PhotosDesktop = () => {
  var [data, setData] = useState([])
  var [showCarroussel, setShowCarroussel] = useState(false)

  const handleChange = () => {
    if (showCarroussel === true) {
      setShowCarroussel(false)
    } else {
      setShowCarroussel(true)
    }
  }

  useEffect(() => {
    Papa.parse('Assets/CSV/imageData.csv', {
    header: true,
    skipEmptyLines: true,
    download: true,
    complete: function (results) {
        var arr = [] //ponder remove
        var tempData = results.data //remove

        for(var j = 0; j < tempData.length; j++) { // remove?
          arr[j] = tempData[j]['urls']
        }
        setData(arr)
      },
    });
  },[]);

  return (
    <div className={'container'} style={{backgroundImage: "url(Assets/IMG/photos.png)", backgroundSize: 'cover'}}>
      <NavBar />
      <Link to='/' style={{textDecoration:'none'}}>
        <Header />
      </Link>
      <SolCounter />
        <PhotosToggle onClick = {handleChange} showCarroussel = {showCarroussel}/>
        {showCarroussel ? <PhotoDisplayCaroussel data = {data} showCarroussel={showCarroussel}/>:<GalleryView data = {data}/>}
      <img className = 'nasaLogo' src={'Assets/IMG/nasaLogo.png'} alt="Nasa Logo"/>
    </div>
  )
}

export default PhotosDesktop