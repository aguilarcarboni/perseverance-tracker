import './App.css';
import React from 'react';
import DesktopR from './DesktopR';

function App() {
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => setHeight(window.innerHeight));
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  return (
    <div>
      {height < width ? <DesktopR />:''}
      {height > width ? <h1>{height}</h1>:''}
    </div>
  )
}

export default App;
