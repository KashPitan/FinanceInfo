from yahoo_fin import stock_info as info
import datetime
import sys 
import json

# ticker = 'TSLA'

res = {'ticker': None, 'value': None, 'time': None, 'success': None, 'msg': None}

x = json.loads(sys.argv[1])
res['ticker'] = x["current"]

if res['ticker'] is not None:
    ticker_passed = True
else:
    ticker_passed = False

if ticker_passed:
    if res['ticker'] != "":
        try:
            price = info.get_live_price(res['ticker'])            
            res['value'] = price
            res['time'] = datetime.datetime.now().strftime("%H:%M:%S, %d-%b-%Y")
            res['success'] = True
        except AssertionError:
            res['success'] = False
            res['msg'] = "Cannot find stock price for " + res['ticker']
    else:
        res['success'] = False
        res['msg'] = "No ticker entered"
else:
    res['success'] = False
    res['msg'] = "Please submit ticker"

print(json.dumps(res))