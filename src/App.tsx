import React from "react";
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CardEntryForm, Invoice, SubmissionOption, BulkOption } from "./components";

const App = () => {
  return (
    <>
      <div className="App">
        <div className="option-container container border">
          <SubmissionOption days={20} price={10} />
          <SubmissionOption days={10} price={50} />
          <SubmissionOption days={5} price={80} />
          <BulkOption/>
        </div>
      </div>
      {/* <CardEntryForm /> */}
    </>
  );
};

export default App;
