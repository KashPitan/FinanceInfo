import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
// import TickerInputForm from "./Components/TickerInputForm";

const App = () => {
  const [livePrice, setLivePrice] = useState("");
  const [liveTicker, setLiveTicker] = useState("");
  const liveTicker2 = useRef(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const isUpdating2 = useRef(false)
  const [buttonText, setButtonText] = useState("");
  const [ticker, setTicker] = useState("");

  useEffect(() => {
    // console.log(isUpdating);
    setButtonText(isUpdating ? "Stop Live Price Update" : "Get Live Prices");
    console.log("isUpdating (useEff useState)? ", isUpdating);
    console.log("isUpdating2 (useEff useRef)? ", isUpdating2.current);

    if (isUpdating) {

      let timer =  setInterval(() => {
        console.log("isUpdating (setInterval useState)? ", isUpdating)
        console.log("isUpdating2 (setInterval useRef)? ", isUpdating2.current)
  
        if (isUpdating2.current) {    
          pollApi();
        }
      }, 2000)

      return () => clearInterval(timer);

    };
    
  }, [isUpdating]);

  const pollApi = async () => {
    console.log(liveTicker);
    console.log(liveTicker2.current);
    try {
      const res = await axios.get("/live", {
        params: {
          ticker: liveTicker2.current,
          // ticker: liveTicker,
        },
      });
      if (res.status !== 200 || res.data.value === null) {
        console.log("bad response");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await pollApi();
      } else {
        setLivePrice(res.data);
        // timer();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleUpdating = () => {
    setIsUpdating(!isUpdating);
    isUpdating2.current = !isUpdating2.current;
    if (ticker === null) {
      M.toast({ html: "Please enter a ticker before submitting" });
    }
  };

  const submitTicker = (e) => {
    e.preventDefault();
    if (ticker === null || ticker === "" || ticker === " ") {
      M.toast({ html: "No ticker entered" });
    } else {
      setLiveTicker(ticker);
      liveTicker2.current = ticker;
    }
  };

  const tickerOnChange = (e) => {
    // console.log(e.target.value);
    setTicker(e.target.value);
  };

  return (
    <>
      <Navbar />
      <h5 id="currentTicker">Current ticker: {liveTicker2.current}</h5>
      <p
        id="stockText"
        style={{ display: livePrice.success ? "block" : "none" }}
      >
        Stock price: {livePrice.value}
      </p>

      <p
        id="timeText"
        style={{ display: livePrice.success ? "block" : "none" }}
      >
        Last update: {livePrice.time}
      </p>

      <p
        id="warningText"
        style={{
          display:
            livePrice.success || typeof livePrice.success == "undefined"
              ? "none"
              : "block",
        }}
      >
        Warning: {livePrice.msg}
      </p>

      {liveTicker2 && (
        <button id="togglePrices" type="button" onClick={toggleUpdating}>
          {buttonText}
        </button>
      )}

      <br></br>

      <form onSubmit={submitTicker}>
        <label>
          <input
            id="tickerInputManual"
            placeholder="Ticker"
            type="text"
            maxLength="10"
            minLength="1"
            onChange={tickerOnChange}
          ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <br></br>

      <form onSubmit={submitTicker}>
        <label>
          Select ticker
          <select
            style={{ display: "block" }}
            id="tickerInputList"
            type="text"
            value={ticker}
            onChange={tickerOnChange}
          >
            <option value="">Select ticker</option>
            <option value="TSLA">TSLA</option>
            <option value="AAPL">AAPL</option>
            <option value="GOOGL">GOOGL</option>
            <option value="AMZN">AMZN</option>
          </select>
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default App;