import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardEntryForm } from "./CardEntryForm";

const Submissions = () => {
  const [orderID, setOrderID] = useState<string>();
  return (
    <div className="submission-wrap">
      <div className="submission-description mt-5 pt-5">

        <div className="submission-heading text-center text-uppercase"> Submission Level </div>

        <div className="container submission-row-wrap pt">
          <div className="submission-row">
            <div className="submission-days text-center"> 20 Day Subs | $25.00 </div> 
            <div className="submission-price text-center"> Max DV $499.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center"> 10 Day Subs | $50.00 </div> 
            <div className="submission-price text-center"> Max DV $999.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center"> 5 Day Subs | $80.00 </div> 
            <div className="submission-price text-center"> Max DV $2499.00  </div>
          </div>
        </div> 

      </div>
 
      {!orderID ? (
        <div className="container mt-5 text-center">
          <p className="submit-directive">Submit your cards below!</p>
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
