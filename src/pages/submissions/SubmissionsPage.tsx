import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardEntryForm } from "./CardEntryForm";

const Submissions = () => {
  const [orderID, setOrderID] = useState<string>();
  return (
    <>
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
      )}
    </>
  );
};

export default Submissions;
