# import requests
import json
import re
import csv

data = json.load(open("hello.json"))
print(len(data))
print(data[0])

year ={}

for node in data:
    val = node.get('Year')
    year[val] = []


# for node in data:
#     for key,value in year.items():
#         print(key)
#         print(value)

print(year)