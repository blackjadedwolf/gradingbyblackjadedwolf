import React from 'react';
import {Button} from 'react-bootstrap';

const Footer = () => {
  return(
    <footer className="footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4 custom-header">Contact</h4>
            <p className="lead mb-0" style={{fontSize:"1rem"}}>
              gradingbyblackjadedwolf@gmail.com
              <br />
              347-589-5251
            </p>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4 custom-header">Around the Web</h4>
            <a className="btn btn-outline-light btn-social mx-1 footer-btn" href="https://facebook.com/blackjadedwolf"><i className="fab fa-fw fa-facebook-f social-icon"></i></a>
            <a className="btn btn-outline-light btn-social mx-1 footer-btn" href="https://twitter.com/blackjadedwolf"><i className="fab fa-fw fa-twitter social-icon"></i></a>
            <a className="btn btn-outline-light btn-social mx-1 footer-btn" href="https://instagram.com/blackjadedwolf"><i className="fab fa-fw fa-instagram social-icon"></i></a>
            <a className="btn btn-outline-light btn-social mx-1 footer-btn" href="https://youtube.com/blackjadedwolf"><i className="fab fa-fw fa-youtube social-icon"></i></a>
          </div>
          <div className="col-lg-4 d-flex mb-5 align-items-center justify-content-center flex-column">
            <h4 className="text-uppercase custom-header mb-4">Book An Appointment</h4>
            <Button className="custom-footer-btn">  
              <a href="https://square.site/book/YGJ7WNMRJ722T/blackjadedwolf-inc-brooklyn-ny" style={{color:"white", fontSize:"1rem", }}> Book </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;