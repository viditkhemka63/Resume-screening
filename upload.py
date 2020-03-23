import requests
import os
import json
from pprint import pprint
import time

f = []
for (dirpath, dirnames, filenames) in os.walk('./dataset/'):
    f.extend(filenames)

print(f)


url = 'http://localhost:3000/insert'
for i in range(56):
    myobj = {
        "url": str(i)
    }
    data = json.dumps(myobj)
    print(data)
    x = requests.post(url, data = myobj)
    print(x.json())

