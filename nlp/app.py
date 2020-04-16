from flask import Flask,request,jsonify
from flask_restful import reqparse,Resource,Api
import numpy as np
import json
import time
import pandas as pd 
import requests 
from clustering.clustering import getVector,predict_classification
from resumeParser import parseResume
from flask_cors import CORS


# import hindi modules

#creating a flask app
app=Flask(__name__)
CORS(app)
api=Api(app)
uri = 'http://localhost:3000/getAll'
STOPWORDS = ['Engineering', 'English', 'Programming', 'Computer science', 'Research', 'Technical', 'System', "Java"]


class JsonAccumulator(Resource):

    def post(self):
        print('post function called')
        json_data = request.get_json(force=True)
		# print(json_data)

        url = json_data['url']
        result = parseResume(url)

        return result


class JsonGetResumeGivenConstraints(Resource):
    def get(self):
        return "hello"
    def post(self):
        json_data = request.get_json(force=True)

        requirement = json_data['requirement']

        nresume= json_data['noOfResume']
        nresume = int(nresume)

        resume = requests.get(uri)
        resume = resume.json()
        mydict = {}
        keys = list(list(resume[0].keys()))
        for key in keys:
            mydict[key] = []
        
        

        for res in list(resume):
            for key in keys:
                mydict[key].append(res[key])
            
        df = pd.DataFrame(mydict)

        if nresume > df.shape[0]:
            nresume = df.shape[0] -1 

        ids = df['_id'].values.tolist()
        rawResume = df['resume'].values.tolist()
        
        vec = getVector([requirement] + rawResume, ids)

        result = predict_classification(vec[1:], vec[0], nresume)

        finalResult = {}

        df['skills'] = df['skills'].apply(lambda x: x.split('$'))
        skillsList = df['skills'].values.tolist()

        skillDict = createDict(skillsList)

        finalResult['skills'] = skillDict

        df['total_experience'] = df['total_experience'].apply(lambda x: int(float(x)))
        expDict = createDict(df['total_experience'].values.tolist(), False)

        finalResult['Experience'] = expDict
        
        finalResume = []
        for  item in result:
            temp  =  df[df['_id'] == item[0] ].to_dict()
            temp = cleanDict(temp)
            temp['score'] = item[1]

            finalResume.append(temp) 
        finalResult['result'] = finalResume
        
        return finalResult


def cleanDict(mydict):
    cleanDict = {}
    keys = list(mydict.keys())
    for key in keys:
        cleanDict[key]  = list(mydict[key].values())[0]  

    return cleanDict      


def createDict(array, flag =True):
    if flag ==True:
        array = [item for sublist in array for item in sublist]
        array = [w for w in array if not w in STOPWORDS] 

    mydict = {}
    for item in array:
        if item in list(mydict.keys()):
            mydict[item]  =  mydict[item]  + 1
        else:
            mydict[item] = 1

    newDict = sorted(mydict.items(), key=lambda x: x[1], reverse=True)
    newDict = list(newDict)
    if flag == True: 
        newDict = newDict[:5]

    result = []
    for item in newDict:
        temp  = { 
            "key": item[0],
            "value": item[1]
        }
        result.append(temp)

    return result

api.add_resource(JsonAccumulator,'/prediction')
api.add_resource(JsonGetResumeGivenConstraints,"/")

if __name__=='__main__':
	app.run(debug=True)