from yahoo_fin import stock_info as info
import datetime

ticker = 'TSLA' 
print("Stock price: ", info.get_live_price(ticker))
print("Current time: ", datetime.datetime.now().time())