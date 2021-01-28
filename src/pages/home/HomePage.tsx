import React from "react";
import logo from "../../assets/img/logo.png";
// import card1 from "../../assets/img/card_1.jpeg";
// import card2 from "../../assets/img/card_2.jpeg";
// import card3 from "../../assets/img/card_3.jpg";
// import card4 from "../../assets/img/card_4.jpg";

const Home = () => {
  return (
    <>
      <header
        className="masthead bg-primary text-white text-center custom-logo-wrap mt-5"
        id="custom_masthead"
      >
        <div
          style={{zIndex:1000}}
          className="container d-flex align-items-center flex-column"
          id="custom_img_wrap"
        >
          <img className="masthead-avatar mb-5 custom-img" src={logo} alt="" />
          <h2 className="page-section-heading text-center" id="custom_heading">
            Group Submission and Appraisal
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-12 about-text">
              <p className="lead">
                BlackJadedWolf is a high end marketer of one of a kind rare
                inserts and parallels based in NYC. We are partnered with the
                PSA Group Submission Program and have been in business for 15
                years. Via our client services we help people buy, sell, and
                give reccomendations on all modern cards. We're here to help you
                along your way as you step into the collectible community.
              </p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a
              className="btn btn-xl custom-about-btn"
              href="https://blackjadedwolf.com"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>
      <section
        className="page-section bg-primary text-white mb-0"
        id="custom-about"
      ></section>
      {/*
      <div className="floating card1">
        <img style={{height: '200px'}} alt="floating card" src={card1}/>
      </div>
      <div className="floating card2">
        <img style={{height: '200px'}} alt="floating card" src={card2}/>
      </div>
      <div className="floating card3">
        <img style={{height: '200px'}} alt="floating card" src={card3}/>
      </div>
      <div className="floating card4">
        <img style={{height: '200px'}} alt="floating card" src={card4}/>
      </div>
      */}
    </>
  );
};

export default Home;
