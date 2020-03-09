import pymongo
import pandas as pd

def getURL():
    df = pd.read_json('/content/env.json',  typ='series')
    return df['mongodbUrl']

def connect(url):
    myclient = pymongo.MongoClient(url)
    mydb = myclient["resume"]
    return mydb

def insertOne(data, mydb):
    mycol = mydb["resume"]
    x = mycol.insert_one(data)
    return x

