import React from 'react';
import logo from '../assets/img/logo.png';

const Hero = () => {
  return(
    <header className="masthead bg-primary text-white text-center" id="custom_masthead">
      <div className="container d-flex align-items-center flex-column">
        <img className="masthead-avatar mb-5 custom-img" src={logo} alt="" />
    </div>
    </header>
  )
}

export default Hero;