import React from "react";
import "../styles/SubmissionOption.css";

type OptionProps = {
  days: number;
  price: number;
};

export const SubmissionOption = (props: OptionProps) => {
  const { days, price } = props;
  return (
    <div className="box">
      <div>
        {props.days} Day Subs | ${props.price.toFixed(2)}
      </div>
      <div>
        <button type="button" className="btn btn-primary">
          Select
        </button>
      </div>
    </div>
  );
};

export const BulkOption = () => {
  return (
    <div className="box">
      <div>
        Bulk Submission
      </div>
      <div>
        <button type="button" className="btn btn-primary">
          Select
        </button>
      </div>
    </div>
  );
};

