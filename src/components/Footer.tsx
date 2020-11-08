import React from 'react';

const Footer = () => {
  return(
    <footer className="footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4 custom-header">Contact</h4>
            <p className="lead mb-0">
              blackjadedwolf@aol.com
              <br />
              123-456-7890
            </p>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4 custom-header">Around the Web</h4>
            <a className="btn btn-outline-light btn-social mx-1 " href="https://facebook.com/blackjadedwolf"><i className="fab fa-fw fa-facebook-f social-icon"></i></a>
            <a className="btn btn-outline-light btn-social mx-1 " href="https://twitter.com/blackjadedwolf"><i className="fab fa-fw fa-twitter social-icon"></i></a>
            <a className="btn btn-outline-light btn-social mx-1 " href="https://instagram.com/blackjadedwolf"><i className="fab fa-fw fa-instagram social-icon"></i></a>
            <a className="btn btn-outline-light btn-social mx-1 " href="https://youtube.com/blackjadedwolf"><i className="fab fa-fw fa-youtube social-icon"></i></a>
          </div>
          <div className="col-lg-4">
            <h4 className="text-uppercase mb-4 custom-header">Third Category</h4>
            <p className="lead mb-0">
              Lorem ipsum blah blah
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;