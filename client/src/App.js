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

  const [isUpdating, setIsUpdating] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [ticker, setTicker] = useState("");

  let timer = () =>
    setTimeout(async () => {
      await pollApi();
    }, 2000);

  const stopTimer = () => {
    console.log("test");
    if (timer) {
      console.log("clearing");
      clearTimeout(timer);
    }
  };

  const tickerOnChange = (e) => {
    // console.log(e.target.value);
    setTicker(e.target.value);
  };

  useEffect(() => {
    // console.log(isUpdating);
    setButtonText(isUpdating ? "Stop Live Price Update" : "Get Live Prices");
    clearTimeout(timer);
    console.log(isUpdating);
    if (isUpdating === true) {
      timer();
    } else if (isUpdating === false) {
      stopTimer();
    }
    // if (isUpdating) pollApi();
  }, [isUpdating]);

  const pollApi = async () => {
    try {
      const res = await axios.get("/live", {
        params: {
          ticker: liveTicker,
        },
      });
      console.log(res);
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
    if (ticker === null) {
      M.toast({ html: "Please enter a ticker before submitting" });
    }
  };

  const submitTickerManual = (e) => {
    e.preventDefault();
    if (ticker === null || ticker === "" || ticker === " ") {
      M.toast({ html: "No ticker entered" });
    } else {
      setLiveTicker(ticker);
      setIsUpdating(!isUpdating);
    }
  };

  const submitTickerList = (e) => {
    e.preventDefault();
    setTicker(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Navbar />
      <h5 id="currentTicker">Current ticker: {liveTicker}</h5>
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
        Current time: {livePrice.time}
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

      {liveTicker && (
        <button id="togglePrices" type="button" onClick={toggleUpdating}>
          {buttonText}
        </button>
      )}

      <br></br>

      <form onSubmit={submitTickerManual}>
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

      {/* <form onSubmit={submitTickerList}>
        <label>
          Select ticker
          <select
            style={{ display: "block" }}
            id="tickerInputList"
            value={tickerInput}
            onChange={tickerOnChange}
          >
            <option value="TSLA">TSLA</option>
            <option value="AAPL">AAPL</option>
            <option value="GOOGL">GOOGL</option>
            <option value="AMZN">AMZN</option>
          </select>
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form> */}
    </>
  );
};

export default App;
