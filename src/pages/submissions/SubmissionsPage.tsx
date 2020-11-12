import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardEntryForm } from "./CardEntryForm";

const Submissions = () => {
  const [orderID, setOrderID] = useState<string>();
  return (
    <div className="submission-wrap">
      <div className="submission-description mt-5">

        <div className="submission-heading text-center  text-uppercase"> Submission Level </div>

        <div className="submission-row-wrap">
          <div className="submission-row">
            <div className="submission-days"> 20 Day Subs | $25.00 </div> 
            <div className="submission-price"> Max DV $499.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days"> 10 Day Subs | $50.00 </div> 
            <div className="submission-price"> Max DV $999.00  </div>
          </div>

          <div className="submission-row">
            <div className="submission-days"> 5 Day Subs | $80.00 </div> 
            <div className="submission-price"> Max DV $2499.00  </div>
          </div>
        </div> 

      </div>
      {/* 
      {!orderID ? (
        <>
          <p>Submit your cards below!</p>
          <CardEntryForm setOrderID={setOrderID} />
        </>
      ) : (
        <>
          <p>View and download your invoice!</p>
          <Link to={`/invoice/${orderID}`}>
            <Button>View Invoice</Button>
          </Link>
        </>
      )} */}
    </div>
  );
};

export default Submissions;
