import requests
import os
import json
from pprint import pprint

f = []
for (dirpath, dirnames, filenames) in os.walk('./dataset/'):
    f.extend(filenames)

print(f)


url = 'http://localhost:5000/prediction'

myobj = {
	"url": "https://viditkhemka00.s3.amazonaws.com/Vidit.pdf"
}
data = json.dumps(myobj)

x = requests.post(url, data = data)
print(x.json())

