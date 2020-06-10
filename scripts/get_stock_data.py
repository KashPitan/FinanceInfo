from yahoo_fin import stock_info as info
import datetime
import sys 
import json

# ticker = 'TSLA'

x = json.loads(sys.argv[1])
ticker = x["current"]

if ticker is not None:
    ticker_passed = True
else:
    ticker_passed = False

if ticker_passed:
    if ticker != "":
        try:
            price = info.get_live_price(ticker)
            print("Stock price for ", ticker, ": ", price)
            print("Current time: ", datetime.datetime.now().time())
        except AssertionError:
            print("Cannot find stock price for ", ticker)
    else:
        print("No ticker entered")
else:
    print("Please submit ticker")