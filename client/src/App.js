import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
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
    apiTest();
  }, []);

  return (
    <>
      <Navbar />
      <h1>HEADER + {apiResTest}</h1>
    </>
  );
};

export default App;
