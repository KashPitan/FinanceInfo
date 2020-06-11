import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

const App = () => {
  const [apiResTest, setApiResTest] = useState("");
  const isUpdating2 = useRef(false);
  const [buttonText, setButtonText] = useState("Get Live Prices");
  // const tickerInput = document.getElementById("tickerInput"); // Can't do this because doesn't exist yet?
  const ticker = useRef(null);

  const pollApi = async () => {
    if (!isUpdating2.current) return;
    const res = await axios
      .get("/live", {
        params: {
          ticker: ticker,
        },
      })
      .then((res) => {
        console.log("api polling");

        // const msg = `Stock price for ${res.data.ticker}: ${res.data.value}. Current time: ${res.data.time}`
        // setApiResTest(msg);
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
    ticker.current = document.getElementById("tickerInput").value;
    if (ticker.current === null || "") {
      M.toast({ html: "Please enter a ticker before submitting" });
      return;
    }

    console.log(ticker.current);
    document.getElementById("currentTicker").innerHTML =
      "Current ticker: " + ticker.current;
    document.getElementById("tickerInput").value = "";
  };

  useEffect(() => {
    pollApi();
  }, [isUpdating2.current]);

  return (
    <>
      <Navbar />
      <h1>HEADER</h1>
      {/* <h1>HEADER {apiResTest}</h1> */}
      <p id="currentTicker">Current ticker: None</p>
      <p
        id="stockText"
        style={{ display: apiResTest.success ? "block" : "none" }}
      >
        Stock price: {apiResTest.value}
      </p>
      <p
        id="timeText"
        style={{ display: apiResTest.success ? "block" : "none" }}
      >
        Current time: {apiResTest.time}
      </p>

      <p
        id="warningText"
        style={{
          display:
            apiResTest.success || typeof apiResTest.success == "undefined"
              ? "none"
              : "block",
        }}
      >
        Warning: {apiResTest.msg}
      </p>

      <button id="togglePrices" type="button" onClick={toggleUpdating}>
        {buttonText}
      </button>
      <div>
        <input
          id="tickerInput"
          placeholder="Ticker"
          type="text"
          maxLength="10"
          minLength="1"
        ></input>
        <button id="submitButton" type="button" onClick={submitTicker}>
          Submit
        </button>
      </div>
    </>
  );
};

export default App;
