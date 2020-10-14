import React from "react";
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CardEntry } from "./CardEntry";

const App = () => {
  return (
    <>
      <div className="App">
        <div className="option-container container border">
          <div className="box">A</div>
          <div className="box">B</div>
          <div className="box">C</div>
          <div className="box">D</div>
        </div>
      </div>
      {/* <CardEntry /> */}
    </>
  );
};

export default App;
