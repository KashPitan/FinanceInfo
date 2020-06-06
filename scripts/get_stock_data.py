from yahoo_fin import stock_info as info

ticker = 'TSLA' 

print(info.get_live_price(ticker))
