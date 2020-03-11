from flask import Flask,request,jsonify
from flask_restful import reqparse,Resource,Api
import numpy as np
import json
import time
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

if __name__=='__main__':
	app.run(debug=True)