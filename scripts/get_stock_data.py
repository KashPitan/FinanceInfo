from yahoo_fin import stock_info as info
import datetime
import sys 
import json

# x = json.loads(sys.argv[1])


ticker = 'TSLA' 
print("Stock price: ", info.get_live_price(ticker))
print("Current time: ", datetime.datetime.now().time())
# print("TEST " + x)
print(sys.argv[1])
# print(type(sys.argv[1]))
# print(x["req"])