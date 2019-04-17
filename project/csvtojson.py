
import pandas as pd
import requests
import json


input_file = 'projectdata.csv'

csv_file = pd.DataFrame(pd.read_csv(input_file, sep = ",", header = 0, index_col = False))
csv_file.to_json("projectdata.json",orient = "records",date_format = "epoch",double_precision = 10, 
                 force_ascii = True,date_unit = "ms",default_handler = None)

data = json.load(open("projectdata.json"))
requests.put('https://inf551-8d68c.firebaseio.com/full.json', json=data)
