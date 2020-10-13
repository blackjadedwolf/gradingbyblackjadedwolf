import React from "react";

import { CardEntry } from "./CardEntry";

const App = () => {
  return (
    <>
      <div className="App">
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="optradio" checked /> Option 1
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="optradio" checked /> Option 1
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="optradio" checked /> Option 1
            </label>
          </div>
        </form>
      </div>
      <CardEntry />
    </>
  );
};

export default App;
