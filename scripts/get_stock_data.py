from yahoo_fin import stock_info as info
import datetime
import sys 
import json

x = json.loads(sys.argv[1])
ticker = x["current"]

# ticker = 'TSLA' 

if ticker != "None" and ticker != "":
    print("Stock price for ", ticker, ": ", info.get_live_price(ticker))
    print("Current time: ", datetime.datetime.now().time())
else:
    print("Please enter ticker")

# print(sys.argv[1])
# print(type(sys.argv[1]))

# print(x)
# print(x["current"])