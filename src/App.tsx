import React from "react";
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CardEntryForm, Invoice } from "./components";

const App = () => {
  return (
<<<<<<< HEAD
    <div className="App">
      <CardEntryForm/>
    </div>
=======
    <>
      <div className="App">
        <div className="option-container container border">
          <SubmissionOption days={20} price={10} />
          <SubmissionOption days={10} price={50} />
          <SubmissionOption days={5} price={80} />
          <BulkOption/>
        </div>
      </div>
      <CardEntryForm />
    </>
>>>>>>> a970ed25e358bd0682031815725432be357d9729
  );
};

export default App;
