from flask import Flask, render_template, redirect, jsonify, current_app
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
# Create an instance of Flask
app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = MongoClient(conn)
db = client.marathon_db
marathon_collection = db.marathon
marathondata = [runner for runner in marathon_collection.find({}, {'_id': False})]


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/api', methods=['GET'])
def api():
    boston = list(marathondata)
    return jsonify(boston)

@app.route('/api/gender', methods=['GET'])
def gender():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Gender": 1,
        "Year": 1
    }
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "gender": "$Gender"},
        "count" : {"$sum" : 1}
    }
    },
   {
      "$sort": {
         "Year": pymongo.ASCENDING
      }
   },
]


    results = marathon_collection.aggregate(pipeline)
    results = [rex for rex in results]
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
