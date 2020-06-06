import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
import Button from "./layout/button";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

const App = () => {
  const [apiResTest, setApiResTest] = useState("");

  const apiTest = () => {
    axios.get("/live").then((res) => {
      console.log(res);
      setApiResTest(res.data);
    });
  };

  useEffect(() => {
    
    const update = true;
    // console.log(update)
    // while (update) {
    //   console.log("TEST")
    //   const intervalId = setInterval(function(){ apiTest() }, 2000);
    // };
    // return () => clearInterval(intervalId);

    apiTest();

  }, []);

  return (
    <>
      <Navbar />
      <h1>HEADER + {apiResTest}</h1>
      <Button />
    </>
  );
};

export default App;
