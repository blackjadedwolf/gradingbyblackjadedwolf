import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardEntryForm } from "./CardEntryForm";
import psaLogo from '../../assets/img/psa-logo.png';
import beckettLogo from '../../assets/img/beckett-logo.png';

const Submissions = () => {
  const [orderID, setOrderID] = useState<string>();
  return (
    <div className="submission-wrap">

      <div className="submission-partners">

        <div className="container submission-row-wrap pt submission-img-wrap">
          <div className="submission-row">
            <img className='submission-partner-img' src={psaLogo} alt="" />
          </div>

          <div className="submission-row">
            <img className='submission-partner-img' src={beckettLogo} alt="" />
          </div>

        </div>

      </div>


      <div className="submission-description mt-5 pt-5">

        <div className="submission-heading text-center text-uppercase"> Standard Submissions </div>

        <div className="container submission-row-wrap pt">
          <div className="submission-row">
            <div className="submission-days text-center"> 20 Day Subs <br></br> $25.00 </div> 
            <div className="submission-price text-center"> Max DV $499.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center"> 10 Day Subs <br></br> $50.00 </div> 
            <div className="submission-price text-center"> Max DV $999.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center"> 5 Day Subs <br></br> $80.00 </div> 
            <div className="submission-price text-center"> Max DV $2499.00  </div>
          </div>

          <div className="text-center mt-4">
            <a className="btn btn-xl custom-about-btn" href="https://blackjadedwolf.com">
              Learn More
            </a>
          </div>

        </div> 

      </div>

      <div className="submission-description mt-3 pt-5">

        <div className="submission-heading text-center text-uppercase"> Bulk / TCG Submissions </div>

        <div className="container submission-row-wrap pt">
          <div className="submission-row">
            <div className="submission-days text-center"> 2017-Present | 45 Day Subs <br></br> $15.00 </div> 
            <div className="submission-price text-center"> Max DV $199.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center"> 1971-2016 | 45 Day Subs <br></br> $12.00 </div> 
            <div className="submission-price text-center"> Max DV $199.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center"> Before 1971 |  45 Day Subs <br></br> $12.00 </div> 
            <div className="submission-price text-center"> Max DV $199.00  </div>
          </div>

          <div className="text-center mt-4">
            <a className="btn btn-xl custom-about-btn" href="https://blackjadedwolf.com">
              Learn More
            </a>
          </div>

        </div> 
      </div>
      
 
      {!orderID ? (
        <div className="container mt-5 text-center">
          <p className="submit-directive text-uppercase" style={{color:"#FFF952", fontWeight:"bold"}}>Submit your cards below!</p>
          <CardEntryForm setOrderID={setOrderID} />
        </div>
      ) : (
        <>
          <p>View and download your invoice!</p>
          <Link to={`/invoice/${orderID}`}>
            <Button>View Invoice</Button>
          </Link>
        </>
      )} 
    </div>
  );
};

export default Submissions;
