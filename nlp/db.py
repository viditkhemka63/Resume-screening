import pymongo
import pandas as pd
import json

url  =  "mongodb+srv://M44:admin123@cluster0-nfbuw.mongodb.net/test?retryWrites=true&w=majority"

def serializeJSON(json_data):
    result = {}

    for key in list(json_data.keys()):
        if type(json_data[key]) == type([]):
           result[key] = "$".join(json_data[key])
        else:
          result[key] = str(json_data[key])

    return result

def getURL():
    df = pd.read_json('/content/env.json',  typ='series')
    return df['mongodbUrl']

def connect():
    myclient = pymongo.MongoClient(url)
    mydb = myclient["resume"]
    return mydb

def insertOne(mydb, data):
    mycol = mydb["resume"]
    data = serializeJSON(data)
    data = json.dumps(data)
    data = json.loads(data)
    print(type(data))
    print(data)
    x = mycol.insert_many(data)
    return x

def getAll(mycol):
    result = mycol.find()
    return result

def getbyAtt(mycol, key, value):
    result = mycol.find({key: value})
    return result

