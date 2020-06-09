import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

const App = () => {
  const [apiResTest, setApiResTest] = useState("");
  const isUpdating2 = useRef(false);
  const [buttonText, setButtonText] = useState("Get Live Prices"); 
  const tickerInput = document.getElementById("tickerInput"); // Can't do this because doesn't exist yet?


  const pollApi = async () => {
    if (!isUpdating2.current) return;
    const res = await axios.get("/live").then((res) => {
      console.log("api polling");
      setApiResTest(res.data);
    });
    setTimeout(async () => {
      await pollApi();
    }, 2000);
  };

  const toggleUpdating = () => {
    isUpdating2.current = !isUpdating2.current;
    console.log(isUpdating2.current);
    setButtonText(
      isUpdating2.current ? "Stop Live Price Update" : "Get Live Prices"
    );
  };

  const submitTicker = () => {
    const ticker = document.getElementById("tickerInput").value
    console.log(ticker);
    document.getElementById("currentTicker").innerHTML = "Current ticker: " + ticker;
    document.getElementById("tickerInput").value = "";
  };

  useEffect(() => {
    pollApi();
  }, [isUpdating2.current]);

  return (
    <>
      <Navbar />
      <h1>HEADER + {apiResTest}</h1>
      <button id="togglePrices" type="button" onClick={toggleUpdating}>
        {buttonText}
      </button>
      <p id="currentTicker">Current ticker: None</p>
      <div>
        <input id="tickerInput" placeholder="Ticker" type="text" maxLength="10"></input>
        <button id="submitButton" type="button" onClick={submitTicker} >Submit</button>
      </div>
    </>
  );
};

export default App;
