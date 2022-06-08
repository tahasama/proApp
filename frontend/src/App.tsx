import React, { useEffect } from "react";

import "./App.css";
import { getAllItns, itnData } from "./state";
import { useAppDispatch, useAppSelector } from "./state/hooks";
function App() {
  const dispatch = useAppDispatch();
  const { all, loading } = useAppSelector(itnData);

  useEffect(() => {
    dispatch(getAllItns());
  }, [dispatch]);

  console.log("all of the itns", loading);
  return (
    <div className="App">
      <header className="App-header">Hello Taha</header>
    </div>
  );
}

export default App;
