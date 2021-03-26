import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardEntryForm } from "./CardEntryForm";
import psaLogo from "../../assets/img/psa-logo.png";
import bulk_pdf from "../../assets/bulk.pdf";
import submission_pdf from "../../assets/submission.pdf";
import { User } from "models";

const Submissions = (props: {
  user?: firebase.default.User;
  userProfile?: Partial<User>;
  isAdmin: boolean
}) => {
  const { user, userProfile, isAdmin } = props;

  const [orderID, setOrderID] = useState<string>();

  return (
    <div className="submission-wrap">
      <div className="submission-description mt-2 pt-5">
        <div className="submission-heading text-center text-uppercase">
          {" "}
          Standard Submissions{" "}
        </div>

        <div className="container submission-row-wrap pt">
          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Economy Service <br></br> $50.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $499.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Regular Service <br></br> $100.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $999.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Express Service <br></br> $175.00{" "}
            </div>
            <div className="submission-price text-center">
              {" "}
              Max DV $2499.00{" "}
            </div>
          </div>
        </div>

        <div className="container submission-row-wrap pt">
          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Super Express Service <br></br> $350.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $4999.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Walk Through Service <br></br> $650.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $9999.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Premium Service <br></br> $1100.00{" "}
            </div>
            <div className="submission-price text-center">
              {" "}
              Max DV $19999.00{" "}
            </div>
          </div>

          <div className="text-center mt-4">
            <a className="btn btn-xl custom-about-btn" href={submission_pdf}>
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="submission-description pt-5">
        <div className="submission-heading text-center text-uppercase">
          {" "}
          Bulk / TCG Submissions{" "}
        </div>

        <div className="container submission-row-wrap pt">
          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Value 2018-Present <br></br> $25.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $499.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Value 1972-2017 <br></br> $20.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $499.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Value 1971 and Earlier <br></br> $20.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $499.00 </div>
          </div>

          <div className="submission-row">
            <div className="submission-days text-center">
              {" "}
              Value TCG <br></br> $20.00{" "}
            </div>
            <div className="submission-price text-center"> Max DV $499.00 </div>
          </div>

          <div className="text-center mt-4">
            <a className="btn btn-xl custom-about-btn" href={bulk_pdf}>
              Learn More
            </a>
          </div>
        </div>
      </div>

      {!orderID ? (
        <div className="container mt-5 text-center">
          <p
            className="submit-directive text-uppercase"
            style={{ color: "#FFF952", fontWeight: "bold" }}
          >
            Submit your cards below!
          </p>
          <CardEntryForm
            setOrderID={setOrderID}
            user={user}
            userProfile={userProfile}
            isAdmin={isAdmin}
          />
        </div>
      ) : (
        <>
          <p>View and download your invoice on your order page!</p>
          <Link to={`/orders/${orderID}`}>
            <Button>View Order</Button>
          </Link>
        </>
      )}

      <div className="submission-partners">
        <div className="container submission-row-wrap submission-img-wrap">
          <div className="submission-row">
            <img className="submission-partner-img" src={psaLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;
