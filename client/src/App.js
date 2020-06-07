import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

const App = () => {
  const [apiResTest, setApiResTest] = useState("");
  const isUpdating2 = useRef(false);
  const [buttonText, setButtonText] = useState("Get Live Prices");
  var interval;

  const apiTest = async () => {
    console.log("calling api");
    await axios.get("/live").then((res) => {
      setApiResTest(res.data);
    });
  };

  const toggleUpdating = () => {
    isUpdating2.current = !isUpdating2.current;
    console.log(isUpdating2.current);
    setButtonText(
      isUpdating2.current ? "Stop Live Price Update" : "Get Live Prices"
    );
    if (!isUpdating2.current) clearInterval(interval);
  };

  useEffect(() => {
    if (isUpdating2.current) {
      interval = setInterval(() => {
        apiTest();
      }, 2000);
    }
  }, [isUpdating2.current]);

  return (
    <>
      <Navbar />
      <h1>HEADER + {apiResTest}</h1>
      <button type="button" onClick={toggleUpdating}>
        {buttonText}
      </button>
    </>
  );
};

export default App;
