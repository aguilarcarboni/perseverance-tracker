import { useEffect, useState } from 'react';
import Papa from 'papaparse'
import { Link } from 'react-router-dom';

const DailyPhoto = () => {
  var [url,setURL] = useState([])

  const onClick = () => {
    console.log('Click');
  } 
 
  useEffect(() => {
    Papa.parse('Assets/CSV/imageData.csv', {
    header: true,
    skipEmptyLines: true,
    download: true,
    complete: function (results) {
        var arr = []
        var tempData = results.data
        console.log(tempData)
        arr.push(tempData[tempData.length-1]['urls'])
        setURL(arr)
      },
    });
  },[]);

  return (
    <div>
        <Link to="/photosD" style ={{textDecoration: 'none'}}>
          <h1 className='captions' style={{textAlign:'center',marginLeft:-10}}>Most recent photo</h1>
        </Link>
      <img className='photo' onClick={onClick} src={url} alt='Most recent'/> 
    </div>
  )
}

export default DailyPhoto