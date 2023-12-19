import React from "react";
import BsState from "./Context/BsState";
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <BsState>
        <Home />
      </BsState>
    </>
  )
}

export default App;
