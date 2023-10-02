import React from 'react'
import Header from '../Inner-components/Header'
import SolCounter from '../Inner-components/SolCounter';
import NavBar from '../Inner-components/NavBar';
import MidBlock from '../Inner-components/MidBlock';
import { Link } from 'react-router-dom';

const HomeDesktop = () => {
  return (
    <div className={'container'} style={{backgroundImage: "url(Assets/IMG/stars.png)", backgroundSize: 'cover'}}>
      <NavBar />
      <Link to='/' style={{textDecoration:'none'}}>
        <Header />
      </Link>
      <SolCounter />
      <MidBlock />
      <img className = 'nasaLogo' src={'Assets/IMG/nasaLogo.png'}  alt="Nasa Logo"/>
    </div>
  )
}

export default HomeDesktop