import './App.css';
import React from 'react';
import Desktop from './components/routes/Desktop/Desktop';
import Mobile from './components/routes/Mobile/Mobile';

function App() {

  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", () => setHeight(window.innerHeight));
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  
  return (
    <div className='container'>
      {height <= width ? <Desktop />:<Mobile />}
    </div>
  )
}

export default App;
