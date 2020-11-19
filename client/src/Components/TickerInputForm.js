import React, { useState } from "react";

const TickerInputForm = (livePrice) => {
  const [manualInputToggle, setManualInputToggle] = useState(false);
  const toggleManualInput = () => {
    setManualInputToggle();
  };

  return (
    <>
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

      <br></br>

      <button id="togglePrices" type="button" onClick={toggleUpdating}>
        {buttonText}
      </button>

      <br></br>

      {manualInputToggle ? (
        <>
          {" "}
          <form onSubmit={submitTickerManual}>
            <label>
              <input
                id="tickerInputManual"
                placeholder="Ticker"
                type="text"
                maxLength="10"
                minLength="1"
              ></input>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <form onSubmit={submitTickerList}>
          <label>
            Select ticker
            {/* <select class="browser-default" id="tickerInputList" value="TEST"> */}
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
        </form>
      )}
      <input
        type="checkbox"
        id="manualInput"
        name="manualInput"
        checked={manualInputToggle}
        onChange={toggleManualInput}
      />
      <label for="manualInput"> Toggle Manual Input </label>
    </>
  );
};

export default TickerInputForm;
