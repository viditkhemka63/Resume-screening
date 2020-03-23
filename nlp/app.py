from flask import Flask,request,jsonify
from flask_restful import reqparse,Resource,Api
import numpy as np
import json
import time
from clustering.clustering import getVector,predict_classification
from resumeParser import parseResume

# import hindi modules

#creating a flask app
app=Flask(__name__)
api=Api(app)

class JsonAccumulator(Resource):

    def post(self):
        print('post function called')
        json_data = request.get_json(force=True)
		# print(json_data)

        url = json_data['url']
        result = parseResume(url)

        return result

api.add_resource(JsonAccumulator,'/prediction')

class JsonGetResumeGivenConstraints(Resource):
    def get(self):
        return "hello"
    def post(self):
        json_data = request.get_json(force=True)
        
        constraints= json_data['constraint']
        
        nresume= json_data['noOfResume']
        
        print(nresume,constraints)
        # Call to NodeJS server for resume text 
        # Currently it is  hard coded below
        sent = [constraints, 'machine learning is fun', 'covid-19 is very dangerous', 'deep learning requires more data']
        
        vec = getVector(sent)
        
        result=predict_classification(vec[1:], vec[0], nresume)
        return result
        
api.add_resource(JsonGetResumeGivenConstraints,"/")

if __name__=='__main__':
	app.run(debug=True)