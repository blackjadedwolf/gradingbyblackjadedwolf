import React from 'react';

const About = () => {
  return(
    <section className="page-section bg-primary text-white mb-0" id="custom-about">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase">About</h2>
        <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-line"></div>
        </div>
        <div className="row">
            <div className="col-lg-12 about-text"><p className="lead">
              BlackJadedWolf is NYC High End Marketer of one of a kind rare inserts and parallels. We have been in 
              Business for 15 years. We buy, sell and give recommendations on all modern cards. With all the Knowledge
              and Experience we have gain an investor, We are taking the next step in helping the community. We are
              blessed to be accepted into the PSA Group Submission Program. We are here to help you along the way.
            </p></div>
        </div>
        <div className="text-center mt-4">
            <a className="btn btn-xl custom-about-btn" href="https://blackjadedwolf.com">
              Learn More
            </a>
        </div>
    </div>
    </section>
  )
}

export default About;